import express from "express";
import { authMiddleware } from "@/middleware/auth.middleware";

import {
  addToCart,
  getCart,
  updateCartItem,
  removeCartItem,
} from "./cart.controller";

import {
  addToCartValidator,
  updateCartItemValidator,
  removeCartItemValidator,
} from "./cart.validator";

const router = express.Router();

router
  .route("/")
  .post(authMiddleware, ...addToCartValidator, addToCart)
  .get(authMiddleware, getCart);

router.patch(
  "/:id",
  authMiddleware,
  ...updateCartItemValidator,
  updateCartItem,
);

router.delete(
  "/:id",
  authMiddleware,
  ...removeCartItemValidator,
  removeCartItem,
);

export default router;
