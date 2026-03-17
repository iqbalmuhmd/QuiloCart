import apiClient from "@/services/apiClient";

const WISHLIST_ROUTES = {
  WISHLIST: "/wishlist",
  REMOVE: (productId) => `/wishlist/${productId}`,
};

export const getWishlist = async () => {
  const response = await apiClient.get(WISHLIST_ROUTES.WISHLIST);

  const data = response.data.data;

  const wishlist = data.map((item) => item.product);

  return {
    wishlist,
  };
};

export const addToWishlist = async (productId) => {
  const response = await apiClient.post(WISHLIST_ROUTES.WISHLIST, {
    productId,
  });

  return response.data.data;
};

export const removeFromWishlist = async (productId) => {
  await apiClient.delete(WISHLIST_ROUTES.REMOVE(productId));
};

const wishlistApi = {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
};

export default wishlistApi;
