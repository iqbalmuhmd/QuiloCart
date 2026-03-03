import apiClient from "@/services/apiClient";

const MERCHANT_ROUTES = {
  REGISTER: "/merchant/register",
};

const merchantRegister = async (data) => {
  const response = await apiClient.post(MERCHANT_ROUTES.REGISTER, data);
  return response.data.data;
};

const merchantApi = {
  merchantRegister,
};

export default merchantApi;
