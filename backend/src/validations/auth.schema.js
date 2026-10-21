import { z } from "zod";

export const registerSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.email("Invalid email address"),
    password: z.string().min(4, "Password must be at least 4 characters")
  })

export const loginSchema = z.object({
  email: z.email("Invalid email address").transform((value) => value.toLowerCase()),
  password: z.string().min(4, "Password must be at least 4 characters"),
  rememberMe: z.boolean().default(false),
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


export const forgotPasswordSchema = z.object({
  email: z
    .email("Please enter a valid email address")
    .trim()
    .transform((value) => value.toLowerCase()),
});

export const verifyResetOtpSchema = z.object({
  email: z
    .email("Please enter a valid email address")
    .trim()
    .transform((value) => value.toLowerCase()),

  otp: z
    .string()
    .regex(/^\d{6}$/, "OTP must be exactly 6 digits"),
});

export const resetPasswordSchema = z
  .object({
    email: z
      .string()
      .trim()
      .email("Please enter a valid email address")
      .transform((value) => value.toLowerCase()),

    otp: z
      .string()
      .regex(/^\d{6}$/, "OTP must be exactly 6 digits"),

    password: z
      .string()
      .min(4, "Password must be at least 4 characters"),

    confirmPassword: z
      .string()
      .min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });


