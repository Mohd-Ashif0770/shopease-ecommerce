
import { OAuth2Client } from "google-auth-library";
import appError from "./appError.js";

const googleClientId = process.env.GOOGLE_CLIENT_ID;

if (!googleClientId) {
  throw new Error("GOOGLE_CLIENT_ID is missing from backend environment");
}

const googleClient = new OAuth2Client(googleClientId);

export const verifyGoogleIdToken = async (idToken) => {
  if (!idToken || typeof idToken !== "string") {
    throw appError(400, "Google credential is required");
  }

  try {
    const ticket = await googleClient.verifyIdToken({
      idToken,
      audience: googleClientId,
    });

    const payload = ticket.getPayload();

    if (!payload?.sub || !payload.email || payload.email_verified !== true) {
      throw appError(401, "Google account could not be verified");
    }

    return {
      googleId: payload.sub,
      email: payload.email.trim().toLowerCase(),
      name: payload.name?.trim() || payload.email.split("@")[0],
      emailVerified: payload.email_verified,
    };
  } catch (error) {
    if (error.statusCode) {
      throw error;
    }

    throw appError(401, "Invalid Google credential");
  }
};
