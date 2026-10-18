import pool from "../config/db.js";
import appError from "../utils/appError.js";
import bcrypt from "bcrypt";
import { generateOTP, hashOTP, verifyOTP } from "../utils/otp.js";
import { sendOtpEmail } from "../utils/email.js";
import jwt from "jsonwebtoken";
import { createRefreshSession, revokeRefreshSession, rotateRefreshSession } from "./refreshSession.service.js";


export const registerService = async (body) => {
  const { name, email, password } = body;

  const connection = await pool.getConnection();
  let userId;
  let otp;

  try {
    await connection.beginTransaction();

    const [existing] = await connection.execute(
      `SELECT id, email_verified_at FROM users WHERE email = ? LIMIT 1`,
      [email],
    );

    const passwordHash = await bcrypt.hash(password, 12);
    otp = generateOTP();
    const otpHash = hashOTP(otp);

    if (existing.length > 0) {
      if (existing[0].email_verified_at) {
        throw appError(409, "An account with this email already exists");
      }

      // Unverified account: refresh details and re-issue OTP
      userId = existing[0].id;
      await connection.execute(
        `UPDATE users SET name = ?, password = ? WHERE id = ?`,
        [name, passwordHash, userId],
      );
      await connection.execute(
        `UPDATE email_otps
         SET consumed_at = UTC_TIMESTAMP()
         WHERE user_id = ? AND purpose = 'registration' AND consumed_at IS NULL`,
        [userId],
      );
    } else {
      const [result] = await connection.execute(
        `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`,
        [name, email, passwordHash],
      );
      userId = result.insertId;
    }

    await connection.execute(
      `INSERT INTO email_otps (user_id, otp_hash, purpose, expires_at)
       VALUES (?, ?, 'registration', DATE_ADD(UTC_TIMESTAMP(), INTERVAL 5 MINUTE))`,
      [userId, otpHash],
    );

    await connection.commit();
  } catch (error) {
    await connection.rollback().catch(() => {});

    if (error.code === "ER_DUP_ENTRY") {
      throw appError(409, "An account with this email already exists");
    }
    throw error; // don't swallow other errors
  } finally {
    connection.release();
  }

  // Send email after commit, outside the try/finally above
  try {
    await sendOtpEmail({ to: email, name, otp, purpose: "registration" });
  } catch (emailError) {
    await pool.execute(
      `UPDATE email_otps
       SET consumed_at = UTC_TIMESTAMP()
       WHERE user_id = ? AND purpose = 'registration' AND consumed_at IS NULL`,
      [userId],
    );
    console.error(
      "Registration email failed for user",
      userId,
      emailError.message,
    );
    throw appError(
      503,
      "Unable to send verification email. Please request a new OTP",
    );
  }

  return { userId, name, email };
};

export const verifyOtpService = async ( email, otp ) => {
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    //find and lock user
    const [users] = await connection.execute(
      `
        SELECT id, email_verified_at
        FROM users
        WHERE email = ?
        LIMIT 1
        FOR UPDATE      
      `,
      [email],
    );

    if (users.length === 0) {
      throw appError(400, "Invalid email or OTP");
    }

    const user = users[0];

    if (user.email_verified_at !== null) {
      throw appError(400, "Email is already verified");
    }

    // Find the latest unused registration OTP.
    const [otps] = await connection.execute(
      `SELECT id, otp_hash, expires_at, attempts
       FROM email_otps
       WHERE user_id = ?
         AND purpose = 'registration'
         AND consumed_at IS NULL
       ORDER BY created_at DESC, id DESC
       LIMIT 1
       FOR UPDATE`,
      [user.id],
    );

    if (otps.length === 0) {
      throw appError(400, "OTP is invalid or expired");
    }

    const otpRecord = otps[0];

    // Limit OTP verification attempts.
    if (otpRecord.attempts >= 5) {
      throw appError(
        429,
        "Too many incorrect attempts. Please request a new OTP.",
      );
    }

    // Check expiration using the database's UTC clock.
    const [expiryRows] = await connection.execute(
      `SELECT expires_at > UTC_TIMESTAMP() AS is_valid
       FROM email_otps
       WHERE id = ?`,
      [otpRecord.id],
    );

    if (!expiryRows[0].is_valid) {
      throw appError(400, "OTP has expired. Please request a new OTP.");
    }

    // Compare the submitted OTP with the stored hash.
    const isValidOTP = verifyOTP(otp, otpRecord.otp_hash);

    if (!isValidOTP) {
      await connection.execute(
        `UPDATE email_otps
         SET attempts = attempts + 1
         WHERE id = ?`,
        [otpRecord.id],
      );

      // Commit so the failed attempt is not rolled back.
      await connection.commit();

      throw appError(400, "Invalid email or OTP");
    }

    // Consume the OTP.
    await connection.execute(
      `UPDATE email_otps
       SET consumed_at = UTC_TIMESTAMP()
       WHERE id = ?
         AND consumed_at IS NULL`,
      [otpRecord.id],
    );

    // Activate the user's account.
    await connection.execute(
      `UPDATE users
       SET email_verified_at = UTC_TIMESTAMP()
       WHERE id = ?
         AND email_verified_at IS NULL`,
      [user.id],
    );

    await connection.commit();

    return {
      userId: user.id,
      email,
      emailVerified: true,
    };
  } catch (error) {
    await connection.rollback().catch(() => {});
    throw error;
  } finally {
    connection.release();
  }
};


export const resendOtpService = async ({ email }) => {
  const connection = await pool.getConnection();
  let userId;
  let otp;
  let otpId;

  try {
    await connection.beginTransaction();

    // 1. Fetch and lock the user row
    const [users] = await connection.execute(
      `SELECT id, name, email, email_verified_at FROM users WHERE email = ? LIMIT 1 FOR UPDATE`,
      [email]
    );

    // Specific Error: Account does not exist
    if (!users.length) {
      await connection.commit();
      throw appError(404, "No account found with this email address.");
    }

    const user = users[0];
    userId = user.id;

    // Specific Error: Account is already verified
    if (user.email_verified_at !== null) {
      await connection.commit();
      throw appError(400, "This email address has already been verified.");
    }

    // 2. Cooldown Check using matching UTC timezones
    const [cooldownRows] = await connection.execute(
      `SELECT created_at > CURRENT_TIMESTAMP - INTERVAL 60 SECOND AS cooldown_active 
       FROM email_otps 
       WHERE user_id = ? AND purpose = 'registration' 
       ORDER BY created_at DESC, id DESC LIMIT 1 FOR UPDATE`,
      [userId]
    );

    // Specific Error: Rate limited / Cooldown active
    if (cooldownRows.length > 0 && cooldownRows[0].cooldown_active) {
      await connection.commit();
      throw appError(429, "Please wait 60 seconds before requesting another OTP.");
    }

    // 3. Invalidate outstanding registration OTPs
    await connection.execute(
      `UPDATE email_otps SET consumed_at = UTC_TIMESTAMP() 
       WHERE user_id = ? AND purpose = 'registration' AND consumed_at IS NULL`,
      [userId]
    );

    // 4. Generate and save the new OTP
    otp = generateOTP();
    const otpHash = hashOTP(otp);

    const [result] = await connection.execute(
      `INSERT INTO email_otps (user_id, otp_hash, purpose, expires_at) 
       VALUES (?, ?, 'registration', DATE_ADD(UTC_TIMESTAMP(), INTERVAL 5 MINUTE))`,
      [userId, otpHash]
    );

    otpId = result.insertId;
    await connection.commit();

    // 5. Send email outside the heavy DB transaction block
    try {
      await sendOtpEmail({
        to: user.email,
        name: user.name,
        otp,
        purpose: "registration",
      });
    } catch (emailError) {
      // Cleanup the generated OTP so it can't be used
      await pool.execute(
        `UPDATE email_otps SET consumed_at = UTC_TIMESTAMP() WHERE id = ? AND consumed_at IS NULL`,
        [otpId]
      );
      console.error("Resend OTP email failed for user", userId, emailError.message);
      
      // Specific Error: Third-party provider failure
      throw appError(503, "The email delivery service failed. Please try again in a few moments.");
    }

    return { sent: true, message: "A new verification code has been sent to your email." };

  } catch (error) {
    await connection.rollback().catch(() => {});
    // If it's one of our explicit appErrors, pass it through directly
    if (error.statusCode) throw error;
    
    // Fallback for unexpected system errors (e.g., database connection dropped)
    throw appError(500, "An internal server error occurred while processing your request.");
  } finally {
    connection.release();
  }
};


export const loginService = async ({ email, password, rememberMe = false }) => {
  const [users] = await pool.execute(
    `SELECT id, name, email, password, role,
            email_verified_at, is_active
     FROM users
     WHERE email = ?
     LIMIT 1`,
    [email],
  );

  const user = users[0];

  // Use the same generic response for unknown email and wrong password.
  if (!user) {
    throw appError(401, "Invalid email or password");
  }

  if (!user.is_active) {
    throw appError(403, "Your account is inactive");
  }

  if (!user.email_verified_at) {
    throw appError(403, "Please verify your email before logging in");
  }

  // A Google-only account may not have a password.
  if (!user.password) {
    throw appError(
      401,
      "This account does not have a password. Please use Google login",
    );
  }

  const passwordMatches = await bcrypt.compare(password, user.password);

  if (!passwordMatches) {
    throw appError(401, "Invalid email or password");
  }

  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not configured");
  }

  const accessToken = jwt.sign(
    {
      userId: user.id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || "15m",
    },
  );

  const { refreshToken, session } = await createRefreshSession(
    user.id,
    rememberMe,
  );

  return {
    accessToken,
    refreshToken,
    rememberMe,
    session,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};


export const refreshTokenService = async (oldRefreshToken) => {
  if (!oldRefreshToken) {
    throw appError(401, "Refresh token is required");
  }

  const rotated = await rotateRefreshSession(oldRefreshToken);

  if (!rotated) {
    throw appError(401, "Invalid or expired refresh token");
  }

  try {
    const [users] = await pool.execute(
      `SELECT id, role
       FROM users
       WHERE id = ? AND is_active = TRUE
         AND email_verified_at IS NOT NULL
       LIMIT 1`,
      [rotated.session.userId],
    );

    if (!users.length) {
      await revokeRefreshSession(rotated.refreshToken);
      throw appError(401, "User account is unavailable");
    }

    const user = users[0];

    const accessToken = jwt.sign(
      {
        userId: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || "15m",
      },
    );

    return {
      accessToken,
      refreshToken: rotated.refreshToken,
      rememberMe: rotated.session.rememberMe,
    };
  } catch (error) {
    // Do not leave the replacement session active if token issuance fails.
    await revokeRefreshSession(rotated.refreshToken).catch(() => {});
    throw error;
  }
};


export const logoutService = async (refreshToken) => {
  if (!refreshToken) {
    return;
  }

  await revokeRefreshSession(refreshToken);
};


export const getProfileService = async (userId) => {
  const [users] = await pool.execute(
    `SELECT id, name, email, role, email_verified_at, created_at
     FROM users
     WHERE id = ? AND is_active = TRUE
     LIMIT 1`,
    [userId],
  );

  if (!users.length) {
    throw appError(401, "User account not found or inactive");
  }

  return users[0];
};





