import pool from "../config/db.js";
import appError from "../utils/appError.js";
import { verifyGoogleIdToken } from "../utils/googleAuth.js";

export const googleAuthService = async (idToken) => {
  const googleUser = await verifyGoogleIdToken(idToken);

  // First, look up the stable Google account identifier.
  const [googleUsers] = await pool.execute(
    `SELECT id, name, email, role, is_active, google_id
     FROM users
     WHERE google_id = ?
     LIMIT 1`,
    [googleUser.googleId],
  );

  if (googleUsers.length > 0) {
    const user = googleUsers[0];

    if (!user.is_active) {
      throw appError(403, "This account has been deactivated");
    }

    return user;
  }

  // Avoid silently linking a Google identity to an existing account.
  const [existingUsers] = await pool.execute(
    `SELECT id, email
     FROM users
     WHERE email = ?
     LIMIT 1`,
    [googleUser.email],
  );

  if (existingUsers.length > 0) {
    throw appError(
      409,
      "An account already exists with this email. Sign in using your existing method first.",
    );
  }

  // Create a new Google-authenticated account.
  const [result] = await pool.execute(
    `INSERT INTO users
       (name, email, password, google_id, role, email_verified_at)
     VALUES (?, ?, NULL, ?, 'customer', UTC_TIMESTAMP())`,
    [
      googleUser.name,
      googleUser.email,
      googleUser.googleId,
    ],
  );

  const [newUsers] = await pool.execute(
    `SELECT id, name, email, role, is_active, google_id
     FROM users
     WHERE id = ?
     LIMIT 1`,
    [result.insertId],
  );

  return newUsers[0];
};
