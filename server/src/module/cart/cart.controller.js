import { validationResult } from "express-validator";
import { ApiError } from "@/utils/ApiError";
import { ApiResponse } from "@/utils/ApiResponse";
import {
  addToCartService,
  getCartService,
  updateCartItemService,
  removeCartItemService,
} from "./cart.service";

export const addToCart = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ApiError(400, errors.array()[0].msg);
  }

  const { productId, quantity } = req.body;

  const cart = await addToCartService(req.user.userId, productId, quantity);

  res.status(201).json(new ApiResponse(201, "Item added to cart", cart));
};

export const getCart = async (req, res) => {
  const cart = await getCartService(req.user.userId);

  res.status(200).json(new ApiResponse(200, "Cart fetched successfully", cart));
};

export const updateCartItem = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ApiError(400, errors.array()[0].msg);
  }

  const { quantity } = req.body;

  const cart = await updateCartItemService(
    req.user.userId,
    req.params.id,
    quantity,
  );

  res.status(200).json(new ApiResponse(200, "Cart item updated", cart));
};

export const removeCartItem = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ApiError(400, errors.array()[0].msg);
  }

  await removeCartItemService(req.user.userId, req.params.id);

  res.status(200).json(new ApiResponse(200, "Cart item removed", null));
};
