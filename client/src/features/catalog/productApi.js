import apiClient from "@/services/apiClient";

const PRODUCT_ROUTES = {
  PRODUCTS: "/products",
  PRODUCT_BY_ID: (id) => `/products/${id}`,
};

const getProducts = async (params = {}) => {
  const response = await apiClient.get(PRODUCT_ROUTES.PRODUCTS, {
    params,
  });

  const data = response.data.data;
  console.log("API response:", data);

  return {
    products: data.products,
    total: data.total,
    page: data.page,
    limit: data.limit,
  };
};

const getProductById = async (id) => {
  const response = await apiClient.get(PRODUCT_ROUTES.PRODUCT_BY_ID(id));
  return response.data.data;
};

const productApi = {
  getProducts,
  getProductById,
};

export default productApi;
