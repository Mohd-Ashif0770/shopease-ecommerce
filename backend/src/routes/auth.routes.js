import express from 'express';
import { forgotPasswordController, getProfileController, loginController, logoutController, refreshTokenController, regiterController, resendOtpController, resetPasswordController, verifyOTPController, verifyResetOtpController } from '../controllers/auth.controller.js';
import validate from '../middlewares/validate.middleware.js';
import { forgotPasswordSchema, loginSchema, registerSchema, resendOtpSchema, resetPasswordSchema, verifyEmailSchema, verifyResetOtpSchema } from '../validations/auth.schema.js';
import protect from '../middlewares/auth.middleware.js';
import { failedLoginLimiter } from '../middlewares/loginRateLimiter.middleware.js';

const router = express.Router();

router.post("/register", validate(registerSchema), regiterController)
router.post("/verify-otp", validate(verifyEmailSchema), verifyOTPController)
router.post("/resend-otp", validate(resendOtpSchema), resendOtpController)
router.post("/login", validate(loginSchema),failedLoginLimiter, loginController);
router.post("/refresh", refreshTokenController);
router.post("/logout", logoutController);
router.get("/profile", protect, getProfileController);
router.post("/forgot-password", validate(forgotPasswordSchema),forgotPasswordController);
router.post(
  "/verify-reset-otp",
  validate(verifyResetOtpSchema),
  verifyResetOtpController,
);

router.post(
  "/reset-password",
  validate(resetPasswordSchema),
  resetPasswordController,
);


export default router;