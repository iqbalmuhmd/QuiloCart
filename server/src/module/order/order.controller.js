import { checkoutService, placeOrderService } from "./order.service";
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
