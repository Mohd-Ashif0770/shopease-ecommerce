import pool from "../config/db.js";
import appError from "../utils/appError.js";
import bcrypt from "bcrypt";
import { generateOTP, hashOTP, verifyOTP } from "../utils/otp.js";
import { sendOtpEmail } from "../utils/email.js";

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
