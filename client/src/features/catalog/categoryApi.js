import apiClient from "@/services/apiClient";

const CATEGORY_ROUTES = {
  CATEGORY: "/categories",
};

const getCategories = async () => {
  const response = await apiClient.get(CATEGORY_ROUTES.CATEGORY);
  return response.data.data;
};

const categoryApi = {
  getCategories,
};

export default categoryApi;
