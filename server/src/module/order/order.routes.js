import express from "express";
import { authMiddleware } from "@/middleware/auth.middleware";
import {
  checkout,
  placeOrder,
  getOrders,
  getOrderById,
  cancelOrder,
} from "./order.controller";

const router = express.Router();

router.post("/checkout", authMiddleware, checkout);

router
  .route("/")
  .get(authMiddleware, getOrders)
  .post(authMiddleware, placeOrder);

router.get("/:id", authMiddleware, getOrderById);

router.patch("/:id/cancel", authMiddleware, cancelOrder);

export default router;
