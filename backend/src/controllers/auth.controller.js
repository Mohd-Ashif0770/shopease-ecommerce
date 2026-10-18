import { registerService, verifyOtpService } from "../services/auth.service.js";
import { successResponse } from "../utils/response.js";

export const regiter = async (req, res, next) => {

    try {
        const user = await registerService(req.body);
        return successResponse(res, 201, "Registration completed", user)
        
    } catch (error) {
        console.error("Registration error:", error.message)
        next(error)
    }
}

export const verifyOTPController = async (req, res, next) => {

    const {email, otp} = req.body;

    try {
        const data = await verifyOtpService(email, otp);
        return successResponse(res, 200, "OTP verification completed", data)
        
    } catch (error) {
        console.error("OTP verification error:", error.message)
        next(error)
    }
}