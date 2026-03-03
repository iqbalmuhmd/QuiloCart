import apiClient from "@/services/apiClient";

const AUTH_ROUTES = {
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  ME: "/auth/me",
};

const login = async (credentials) => {
  const response = await apiClient.post(AUTH_ROUTES.LOGIN, credentials);
  return response.data.data;
};

const register = async (data) => {
  const response = await apiClient.post(AUTH_ROUTES.REGISTER, data);
  return response.data.data;
};

const getMe = async () => {
  const response = await apiClient.get(AUTH_ROUTES.ME);
  return response.data.data;
};

const authApi = {
  login,
  register,
  getMe,
};

export default authApi;
