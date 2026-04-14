import apiClient from "@/services/apiClient";

const ADMIN_ROUTES = {
  LOGIN: "/admin/login",
  MERCHANTS: "/admin/merchants",
  ORDERS: "/admin/orders",
};

const adminLogin = async (credentials) => {
  const response = await apiClient.post(ADMIN_ROUTES.LOGIN, credentials);
  return response.data.data;
};

const getMerchants = async (status) => {
  const response = await apiClient.get(
    `${ADMIN_ROUTES.MERCHANTS}?status=${status}`,
  );
  return response.data.data;
};

const getMerchantById = async (merchantId) => {
  const response = await apiClient.get(
    `${ADMIN_ROUTES.MERCHANTS}/${merchantId}`,
  );
  return response.data.data;
};

const approveMerchant = async (merchantId) => {
  const response = await apiClient.patch(
    `${ADMIN_ROUTES.MERCHANTS}/${merchantId}/approve`,
  );
  return response.data.data;
};

const rejectMerchant = async (merchantId) => {
  const response = await apiClient.patch(
    `${ADMIN_ROUTES.MERCHANTS}/${merchantId}/reject`,
  );
  return response.data.data;
};

const blockMerchant = async (merchantId) => {
  const response = await apiClient.patch(
    `${ADMIN_ROUTES.MERCHANTS}/${merchantId}/block`,
  );
  return response.data.data;
};

const getAllOrders = async () => {
  const response = await apiClient.get(ADMIN_ROUTES.ORDERS);
  return response.data.data;
};

const adminApi = {
  adminLogin,
  getMerchants,
  getMerchantById,
  approveMerchant,
  rejectMerchant,
  blockMerchant,
  getAllOrders,
};

export default adminApi;
