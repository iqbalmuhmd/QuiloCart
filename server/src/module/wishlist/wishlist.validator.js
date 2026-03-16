import { body, param } from "express-validator";

export const addWishlistValidator = [
  body("productId")
    .notEmpty()
    .withMessage("Product id is required")
    .isMongoId()
    .withMessage("Invalid product id"),
];

export const removeWishlistValidator = [
  param("productId").isMongoId().withMessage("Invalid product id"),
];
