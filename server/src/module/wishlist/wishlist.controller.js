import { validationResult } from "express-validator";
import { ApiError } from "@/utils/ApiError";
import { ApiResponse } from "@/utils/ApiResponse";
import {
  addToWishlistService,
  getWishlistService,
  removeFromWishlistService,
} from "./wishlist.service";

export const addToWishlist = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new ApiError(400, errors.array()[0].msg);
  }

  const wishlistItem = await addToWishlistService(
    req.user.userId,
    req.body.productId,
  );

  res
    .status(201)
    .json(new ApiResponse(201, "Product added to wishlist", wishlistItem));
};

export const getWishlist = async (req, res) => {
  const wishlist = await getWishlistService(req.user.userId);

  res
    .status(200)
    .json(new ApiResponse(200, "Wishlist fetched successfully", wishlist));
};

export const removeFromWishlist = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new ApiError(400, errors.array()[0].msg);
  }

  await removeFromWishlistService(req.user.userId, req.params.productId);

  res
    .status(200)
    .json(new ApiResponse(200, "Product removed from wishlist", null));
};
