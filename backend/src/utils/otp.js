import { createHash, randomInt, timingSafeEqual } from "node:crypto";

export const generateOTP = () => {
  return randomInt(100000, 1000000).toString();
};

export const hashOTP = (otp) => {
  return createHash("sha256").update(otp).digest("hex");
};

export const verifyOTP = (otp, storedHash) => {
  const inputHash = hashOTP(otp);

  const inputBuffer = Buffer.from(inputHash, "hex");
  const storedBuffer = Buffer.from(storedHash, "hex");

  return (
    inputBuffer.length === storedBuffer.length &&
    timingSafeEqual(inputBuffer, storedBuffer)
  );
};