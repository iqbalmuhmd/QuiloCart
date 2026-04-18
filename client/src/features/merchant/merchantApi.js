import apiClient from "@/services/apiClient";

const MERCHANT_ROUTES = {
  REGISTER: "/merchant/register",
  PRODUCTS: "/merchant/products",
  PRODUCT_BY_ID: (id) => `/merchant/products/${id}`,
  ORDERS: "/orders/merchant",
  ORDER_BY_ID: (id) => `/orders/merchant/${id}`,
  UPDATE_ORDER_STATUS: (id) => `/orders/${id}/status`,
  ANALYTICS: "/merchant/analytics",
};

const merchantRegister = async (data) => {
  const response = await apiClient.post(MERCHANT_ROUTES.REGISTER, data);
  return response.data.data;
};

const getMerchantProducts = async () => {
  const response = await apiClient.get(MERCHANT_ROUTES.PRODUCTS);

  return response.data.data;
};

const createProduct = async (productData) => {
  const response = await apiClient.post(MERCHANT_ROUTES.PRODUCTS, productData);

  return response.data.data;
};

const updateProduct = async (id, productData) => {
  const response = await apiClient.patch(
    MERCHANT_ROUTES.PRODUCT_BY_ID(id),
    productData,
  );

  return response.data.data;
};

const deleteProduct = async (id) => {
  await apiClient.delete(MERCHANT_ROUTES.PRODUCT_BY_ID(id));
};

const getMerchantOrders = async () => {
  const response = await apiClient.get(MERCHANT_ROUTES.ORDERS);

  return response.data.data;
};

const getMerchantOrderById = async (orderId) => {
  const response = await apiClient.get(MERCHANT_ROUTES.ORDER_BY_ID(orderId));

  return response.data.data;
};

const updateOrderStatus = async (orderId, status) => {
  const response = await apiClient.patch(
    MERCHANT_ROUTES.UPDATE_ORDER_STATUS(orderId),
    { status },
  );

  return response.data.data;
};

const getAnalytics = async (period) => {
  const response = await apiClient.get(MERCHANT_ROUTES.ANALYTICS, {
    params: { period },
  });

  return response.data.data;
};

const merchantApi = {
  merchantRegister,
  getMerchantProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getMerchantOrders,
  getMerchantOrderById,
  updateOrderStatus,
  getAnalytics,
};

export default merchantApi;
