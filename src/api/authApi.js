import API from "../services/axios";
import { API_ENDPOINTS } from "../constants/apiEndpoints";

export const loginUser = async (payload) => {
  const { data } = await API.post(API_ENDPOINTS.AUTH.LOGIN, payload);
  return data;
};

export const registerUser = async (payload) => {
  const { data } = await API.post(API_ENDPOINTS.AUTH.REGISTER, payload);
  return data;
};

export const verifyRegisterOtp = async (payload) => {
  const { data } = await API.post(API_ENDPOINTS.AUTH.VERIFY_REGISTER_OTP, payload);
  return data;
};

export const forgotPassword = async (payload) => {
  const { data } = await API.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, payload);
  return data;
};

export const resetPassword = async (payload) => {
  const { data } = await API.post(API_ENDPOINTS.AUTH.RESET_PASSWORD_OTP, payload);
  return data;
};

export const getCurrentUser = async () => {
  const { data } = await API.get(API_ENDPOINTS.AUTH.ME);
  return data;
};

export const logoutUser = async () => {
  const { data } = await API.post(API_ENDPOINTS.AUTH.LOGOUT);
  return data;
};
