import express from "express";
import { authMiddleware } from "@/middleware/auth.middleware";
import {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} from "./wishlist.controller";
import {
  addWishlistValidator,
  removeWishlistValidator,
} from "./wishlist.validator";

const router = express.Router();

router
  .route("/")
  .post(authMiddleware, ...addWishlistValidator, addToWishlist)
  .get(authMiddleware, getWishlist);

router.delete(
  "/:productId",
  authMiddleware,
  ...removeWishlistValidator,
  removeFromWishlist,
);

export default router;
