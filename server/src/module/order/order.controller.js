import {
  checkoutService,
  placeOrderService,
  getOrdersService,
  getOrderByIdService,
  cancelOrderService,
} from "./order.service";
import { ApiResponse } from "@/utils/ApiResponse";

export const checkout = async (req, res) => {
  const { addressId } = req.body;

  const result = await checkoutService(req.user.userId, addressId);

  res
    .status(200)
    .json(new ApiResponse(200, "Checkout summary fetched", result));
};

export const placeOrder = async (req, res) => {
  const { addressId } = req.body;

  const order = await placeOrderService(req.user.userId, addressId);

  res
    .status(201)
    .json(new ApiResponse(201, "Order placed successfully", order));
};

export const getOrders = async (req, res) => {
  const orders = await getOrdersService(req.user.userId);

  res
    .status(200)
    .json(new ApiResponse(200, "Orders fetched successfully", orders));
};

export const getOrderById = async (req, res) => {
  const { id } = req.params;

  const order = await getOrderByIdService(req.user.userId, id);

  res
    .status(200)
    .json(new ApiResponse(200, "Order fetched successfully", order));
};

export const cancelOrder = async (req, res) => {
  const { id } = req.params;

  await cancelOrderService(req.user.userId, id);

  res
    .status(200)
    .json(new ApiResponse(200, "Order cancelled successfully", null));
};
