import apiClient from "@/services/apiClient";

const MERCHANT_ROUTES = {
  REGISTER: "/merchant/register",
  PRODUCTS: "/merchant/products",
  PRODUCT_BY_ID: (id) => `/merchant/products/${id}`,
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
  const response = await apiClient.delete(MERCHANT_ROUTES.PRODUCT_BY_ID(id));

  return response.data.data;
};

const merchantApi = {
  merchantRegister,
  getMerchantProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};

export default merchantApi;
