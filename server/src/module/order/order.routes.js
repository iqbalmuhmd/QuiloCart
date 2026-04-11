import express from "express";
import { authMiddleware } from "@/middleware/auth.middleware";
import { roleMiddleware } from "@/middleware/role.middleware";
import { approvedMerchantMiddleware } from "@/middleware/approvedMerchant.middleware";
import { USER_ROLES } from "@/utils/constants";
import {
  checkout,
  placeOrder,
  initiatePayment,
  verifyPayment,
  updateOrderStatus,
  getOrders,
  getOrderById,
  cancelOrder,
  getMerchantOrders,
  getMerchantOrderById,
} from "./order.controller";
import {
  placeOrderValidator,
  orderIdValidator,
  updateOrderStatusValidator,
} from "./order.validator";

const router = express.Router();

const userOnly = [authMiddleware, roleMiddleware(USER_ROLES.USER)];
const merchantOnly = [authMiddleware, approvedMerchantMiddleware];

router.post("/checkout", ...userOnly, checkout);

router
  .route("/")
  .get(...userOnly, getOrders)
  .post(...userOnly, ...placeOrderValidator, placeOrder);

router.get("/merchant", ...merchantOnly, getMerchantOrders);

router.get(
  "/merchant/:id",
  ...merchantOnly,
  ...orderIdValidator,
  getMerchantOrderById,
);

router.post("/:id/pay", ...userOnly, ...orderIdValidator, initiatePayment);

router.post("/:id/verify", ...userOnly, ...orderIdValidator, verifyPayment);

router.patch(
  "/:id/status",
  ...merchantOnly,
  ...updateOrderStatusValidator,
  updateOrderStatus,
);

router.get("/:id", ...userOnly, ...orderIdValidator, getOrderById);

router.patch("/:id/cancel", ...userOnly, ...orderIdValidator, cancelOrder);

export default router;
