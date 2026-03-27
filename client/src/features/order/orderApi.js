import apiClient from "@/services/apiClient";

const ORDER_ROUTES = {
  CHECKOUT: "/orders/checkout",
  ORDERS: "/orders",
  ORDER: (id) => `/orders/${id}`,
  CANCEL: (id) => `/orders/${id}/cancel`,
};

export const checkout = async (addressId) => {
  const response = await apiClient.post(ORDER_ROUTES.CHECKOUT, {
    addressId,
  });

  const data = response.data.data;

  return {
    items: data.items || [],
    totalItems: data.totalItems || 0,
    totalQuantity: data.totalQuantity || 0,
    totalAmount: data.totalAmount || 0,
    address: data.address || null,
  };
};

export const placeOrder = async (addressId) => {
  const response = await apiClient.post(ORDER_ROUTES.ORDERS, {
    addressId,
  });

  return response.data.data;
};

export const getOrders = async () => {
  const response = await apiClient.get(ORDER_ROUTES.ORDERS);

  return response.data.data || [];
};

export const getOrderById = async (orderId) => {
  const response = await apiClient.get(ORDER_ROUTES.ORDER(orderId));

  return response.data.data;
};

export const cancelOrder = async (orderId) => {
  const response = await apiClient.patch(ORDER_ROUTES.CANCEL(orderId));

  return response.data.data;
};

const orderApi = {
  checkout,
  placeOrder,
  getOrders,
  getOrderById,
  cancelOrder,
};

export default orderApi;
