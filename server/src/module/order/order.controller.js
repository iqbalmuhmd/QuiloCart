import { validationResult } from "express-validator";
import {
  checkoutService,
  placeOrderService,
  initiatePaymentService,
  verifyPaymentService,
  updateOrderStatusService,
  getOrdersService,
  getOrderByIdService,
  cancelOrderService,
} from "./order.service";
import { ApiResponse } from "@/utils/ApiResponse";
import { ApiError } from "@/utils/ApiError";

export const checkout = async (req, res) => {
  const result = await checkoutService(req.user.userId);

  res
    .status(200)
    .json(new ApiResponse(200, "Checkout summary fetched", result));
};

export const placeOrder = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new ApiError(400, errors.array()[0].msg);
  }

  const { addressId, paymentMethod } = req.body;

  const order = await placeOrderService(
    req.user.userId,
    addressId,
    paymentMethod,
  );

  res
    .status(201)
    .json(new ApiResponse(201, "Order placed successfully", order));
};

export const initiatePayment = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new ApiError(400, errors.array()[0].msg);
  }

  const { id } = req.params;

  const result = await initiatePaymentService(req.user.userId, id);

  res.status(200).json(new ApiResponse(200, "Payment initiated", result));
};

export const verifyPayment = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new ApiError(400, errors.array()[0].msg);
  }

  const { id } = req.params;

  const result = await verifyPaymentService(req.user.userId, id, req.body);

  res.status(200).json(new ApiResponse(200, "Payment verified", result));
};

export const updateOrderStatus = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new ApiError(400, errors.array()[0].msg);
  }

  const { id } = req.params;
  const { status } = req.body;

  const result = await updateOrderStatusService(id, status, req.merchant._id);

  res.status(200).json(new ApiResponse(200, "Order status updated", result));
};

export const getOrders = async (req, res) => {
  const orders = await getOrdersService(req.user.userId);

  res
    .status(200)
    .json(new ApiResponse(200, "Orders fetched successfully", orders));
};

export const getOrderById = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new ApiError(400, errors.array()[0].msg);
  }

  const { id } = req.params;

  const order = await getOrderByIdService(req.user.userId, id);

  res
    .status(200)
    .json(new ApiResponse(200, "Order fetched successfully", order));
};

export const cancelOrder = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new ApiError(400, errors.array()[0].msg);
  }

  const { id } = req.params;

  const order = await cancelOrderService(req.user.userId, id);

  res
    .status(200)
    .json(new ApiResponse(200, "Order cancelled successfully", order));
};
