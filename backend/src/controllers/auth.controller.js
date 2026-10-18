import { registerService, resendOtpService, verifyOtpService } from "../services/auth.service.js";
import { successResponse } from "../utils/response.js";

export const regiterController = async (req, res, next) => {
  try {
    const user = await registerService(req.body);
    return successResponse(res, 201, "Registration done, Please verify your email", user);
  } catch (error) {
    console.error("Registration error:", error.message);
    next(error);
  }
};

export const verifyOTPController = async (req, res, next) => {
  const { email, otp } = req.body;

  try {
    const data = await verifyOtpService(email, otp);
    return successResponse(res, 200, "OTP verification completed", data);
  } catch (error) {
    console.error("OTP verification error:", error.message);
    next(error);
  }
};

export const resendOtpController = async (req, res, next) => {
  try {
    const result = await resendOtpService(req.body);

    return successResponse(
      res, 
      200, 
      result.message || "Verification code sent successfully."
    );
  } catch (error) {
    next(error);
  }
};
