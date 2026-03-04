import apiClient from "@/services/apiClient";

const ADMIN_ROUTES = {
  LOGIN: "/admin/login",
};

const adminLogin = async (credentials) => {
  const response = await apiClient.post(ADMIN_ROUTES.LOGIN, credentials);
  return response.data.data;
};

const adminApi = {
  adminLogin,
};

export default adminApi;
