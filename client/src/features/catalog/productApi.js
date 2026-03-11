import apiClient from "@/services/apiClient";

const CATALOG_ROUTES = {
  PRODUCTS: "/products",
  PRODUCT_BY_ID: (id) => `/products/${id}`,
};

export const getProducts = async (params = {}) => {
  const response = await apiClient.get(CATALOG_ROUTES.PRODUCTS, {
    params,
  });

  const data = response.data.data;

  return {
    products: data.products,
    total: data.total,
    page: data.page,
    limit: data.limit,
  };
};

export const getProductById = async (id) => {
  const response = await apiClient.get(CATALOG_ROUTES.PRODUCT_BY_ID(id));
  return response.data.data;
};

const catalogApi = {
  getProducts,
  getProductById,
};

export default catalogApi;
