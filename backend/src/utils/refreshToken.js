
import { randomBytes, createHash, randomUUID } from "node:crypto";

export const generateRefreshToken = () => {
  return randomBytes(32).toString("base64url");
};

export const hashRefreshToken = (token) => {
  return createHash("sha256").update(token).digest("hex");
};

export const generateSessionId = () => {
  return randomUUID();
};
