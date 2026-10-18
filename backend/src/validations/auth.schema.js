import { z } from "zod";

export const registerSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.email("Invalid email address"),
    password: z.string().min(4, "Password must be at least 4 characters"),
    confirmPassword: z.string().min(4, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // Sets the error specifically on the confirmPassword field
  });

export const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(4, "Password must be at least 4 characters"),
});

export const verifyEmailSchema = z.object({
  email: z.email("Invalid email address"),
  otp: z.string()
    .length(6, "OTP must be exactly 6 digits")
    .regex(/^\d+$/, "OTP must contain only numbers"),
});


export const resendOtpSchema = z.object({
  email: z.email("Please provide a valid email address"),
});

