import express from "express";
import { authMiddleware } from "@/middleware/auth.middleware";
import { roleMiddleware } from "@/middleware/role.middleware";
import { USER_ROLES } from "@/utils/constants";
import {
  checkout,
  placeOrder,
  getOrders,
  getOrderById,
  cancelOrder,
} from "./order.controller";
import {
  checkoutValidator,
  placeOrderValidator,
  orderIdValidator,
} from "./order.validator";

const router = express.Router();

const userOnly = [authMiddleware, roleMiddleware(USER_ROLES.USER)];

router.post("/checkout", ...userOnly, ...checkoutValidator, checkout);

router
  .route("/")
  .get(...userOnly, getOrders)
  .post(...userOnly, ...placeOrderValidator, placeOrder);

router.get("/:id", ...userOnly, ...orderIdValidator, getOrderById);

router.patch("/:id/cancel", ...userOnly, ...orderIdValidator, cancelOrder);

export default router;
