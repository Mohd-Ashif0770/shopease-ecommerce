import express from 'express';
import { regiterController, resendOtpController, verifyOTPController } from '../controllers/auth.controller.js';
import validate from '../middlewares/validate.middleware.js';
import { registerSchema, resendOtpSchema, verifyEmailSchema } from '../validations/auth.schema.js';

const router = express.Router();

router.post("/register", validate(registerSchema), regiterController)
router.post("/verify-otp", validate(verifyEmailSchema), verifyOTPController)
router.post("/resend-otp", validate(resendOtpSchema), resendOtpController)

export default router;