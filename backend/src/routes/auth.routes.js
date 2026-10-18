import express from 'express';
import { regiter, verifyOTPController } from '../controllers/auth.controller.js';
import validate from '../middlewares/validate.middleware.js';
import { registerSchema, verifyEmailSchema } from '../validations/auth.schema.js';

const router = express.Router();

router.post("/register", validate(registerSchema), regiter)
router.post("/verify-otp", validate(verifyEmailSchema), verifyOTPController)

export default router;