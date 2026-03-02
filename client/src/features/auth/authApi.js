import apiClient from "@/services/apiClient";

const AUTH_ROUTES = {
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  ME: "/auth/me",
  MERCHANT_LOGIN: "/merchant/register"
};

const login = async (credentials) => {
  const response = await apiClient.post(AUTH_ROUTES.LOGIN, credentials);
  return response.data.data;
};

const register = async (data) => {
  const response = await apiClient.post(AUTH_ROUTES.REGISTER, data);
  return response.data;
};

const getMe = async () => {
  const response = await apiClient.get(AUTH_ROUTES.ME);
  return response.data;
};

const merchantRegister = async (data) => {
  const response = await apiClient.post(AUTH_ROUTES.MERCHANT_LOGIN, data);
  return response.data;
};

const authApi = {
  login,
  register,
  getMe,
  merchantRegister,
};

export default authApi;
