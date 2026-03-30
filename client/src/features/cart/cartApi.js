import apiClient from "@/services/apiClient";

const CART_ROUTES = {
  CART: "/cart",
  ITEM: (id) => `/cart/${id}`,
};

const normalizeCart = (data) => {
  return {
    cart: data.cart || [],
    totalItems: data.totalItems || 0,
    totalQuantity: data.totalQuantity || 0,
    totalAmount: data.totalAmount || 0,
  };
};

export const getCart = async () => {
  const response = await apiClient.get(CART_ROUTES.CART);

  return normalizeCart(response.data.data);
};

export const addToCart = async (productId, quantity = 1) => {
  const response = await apiClient.post(CART_ROUTES.CART, {
    productId,
    quantity,
  });

  return normalizeCart(response.data.data);
};

export const updateCartItem = async (itemId, quantity) => {
  const response = await apiClient.patch(CART_ROUTES.ITEM(itemId), {
    quantity,
  });

  return normalizeCart(response.data.data);
};

export const removeCartItem = async (itemId) => {
  const response = await apiClient.delete(CART_ROUTES.ITEM(itemId));

  console.log("response.data", response.data);
console.log("response.data.data", response.data.data);


  return normalizeCart(response.data.data);
};

const cartApi = {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
};

export default cartApi;
