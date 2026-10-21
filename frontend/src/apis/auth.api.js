import { AwardIcon } from "lucide-react";
import api from "./axios";

export const registerAPI = async (userData) => {
  const response = await api.post("/auth/register", userData);
  return response.data;
};

export const loginAPI = async (credentials) => {
  const response = await api.post("/auth/login", credentials);
  return response.data;
};

export const refreshTokenAPI = async () => {
  const response = await api.post("/auth/refresh");
  return response.data;
};

export const logoutAPI = async () => {
  const response = await api.post("/auth/logout");
  return response.data;
};

export const getProfileAPI = async (accessToken) => {
  const response = await api.get("/auth/profile", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data;
};

export const verifyOtpAPI = async (data) => {
  const response = await api.post("/auth/verify-otp", data);
  return response.data;
};

export const resendOtpAPI = async (data) => {
  const response = await api.post("/auth/resend-otp", data);
  return response.data;
};

export const forgotPasswordAPI = async (data) => {
  const response = await api.post("/auth/forgot-password", data);
  return response.data;
};

export const verifyResetOtpAPI =async (data) => {
  const response = await api.post("/auth/verify-reset-otp", data);
  return response.data;
};

export const resetPasswordAPI = async (data) => {
  const response = await api.post("/auth/reset-password", data);
  return response.data;
};
