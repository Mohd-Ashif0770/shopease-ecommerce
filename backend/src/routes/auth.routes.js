import express from 'express';
import { getProfileController, loginController, logoutController, refreshTokenController, regiterController, resendOtpController, verifyOTPController } from '../controllers/auth.controller.js';
import validate from '../middlewares/validate.middleware.js';
import { loginSchema, registerSchema, resendOtpSchema, verifyEmailSchema } from '../validations/auth.schema.js';
import protect from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post("/register", validate(registerSchema), regiterController)
router.post("/verify-otp", validate(verifyEmailSchema), verifyOTPController)
router.post("/resend-otp", validate(resendOtpSchema), resendOtpController)
router.post("/login", validate(loginSchema), loginController);
router.post("/refresh", refreshTokenController);
router.post("/logout", logoutController);
router.get("/profile", protect, getProfileController);


export default router;