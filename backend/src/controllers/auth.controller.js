import {
  forgotPasswordService,
  getProfileService,
  loginService,
  logoutService,
  refreshTokenService,
  registerService,
  resendOtpService,
  resetPasswordService,
  verifyOtpService,
  verifyResetOtpService,
} from "../services/auth.service.js";
import { successResponse } from "../utils/response.js";

export const regiterController = async (req, res, next) => {
  try {
    const user = await registerService(req.body);
    return successResponse(
      res,
      201,
      "Registration done, Please verify your email",
      user,
    );
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
      result.message || "Verification code sent successfully.",
    );
  } catch (error) {
    next(error);
  }
};

export const loginController = async (req, res, next) => {
  try {
    const result = await loginService(req.body);

    const isProduction = process.env.NODE_ENV === "production";

    res.cookie("refreshToken", result.refreshToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: "lax",
      path: "/api/auth",
      ...(result.rememberMe ? { maxAge: 7 * 24 * 60 * 60 * 1000 } : {}),
    });

    const payload = {
      accessToken: result.accessToken,
      user: result.user,
    };
    return successResponse(res, 200, "Login successful", payload);
  } catch (error) {
    next(error);
  }
};

export const refreshTokenController = async (req, res, next) => {
  try {
    const oldRefreshToken = req.cookies?.refreshToken;

    const result = await refreshTokenService(oldRefreshToken);

    const isProduction = process.env.NODE_ENV === "production";

    res.cookie("refreshToken", result.refreshToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: "lax",
      path: "/api/auth",
      ...(result.rememberMe ? { maxAge: 7 * 24 * 60 * 60 * 1000 } : {}),
    });

    const payload = {
      accessToken: result.accessToken,
    };
    return successResponse(res, 200, "Token refreshed successfully", payload);
  } catch (error) {
    next(error);
  }
};

export const logoutController = async (req, res, next) => {
  try {
    const refreshToken = req.cookies?.refreshToken;

    await logoutService(refreshToken);

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/api/auth",
    });

    return successResponse(res, 200, "Logout successful");
  } catch (error) {
    next(error);
  }
};

export const getProfileController = async (req, res, next) => {
  try {
    const user = await getProfileService(req.user.id);

    return successResponse(res, 200, "Profile fetched successfully", user);
  } catch (error) {
    next(error);
  }
};

export const forgotPasswordController = async (req, res, next) => {
  try {
    const result = await forgotPasswordService(req.body);

    return successResponse(res, 200, result.message);
  } catch (error) {
    next(error);
  }
};

export const verifyResetOtpController = async (req, res, next) => {
  try {
    const result = await verifyResetOtpService(req.body);

    return successResponse(res, 200, result.message);
  } catch (error) {
    next(error);
  }
};

export const resetPasswordController = async (req, res, next) => {
  try {
    const result = await resetPasswordService(req.body);

    return successResponse(res, 200, result.message);
  } catch (error) {
    next(error);
  }
};
