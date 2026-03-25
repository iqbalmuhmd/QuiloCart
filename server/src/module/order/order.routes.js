import express from "express";
import { authMiddleware } from "@/middleware/auth.middleware";
import { checkout, placeOrder } from "./order.controller";

const router = express.Router();

router.post("/checkout", authMiddleware, checkout);

router.post("/", authMiddleware, placeOrder);

export default router;
