import { param, body } from "express-validator";

export const placeOrderValidator = [
  body("addressId")
    .notEmpty()
    .withMessage("Address ID is required")
    .isMongoId()
    .withMessage("Invalid address ID"),
];

export const orderIdValidator = [
  param("id").isMongoId().withMessage("Invalid order ID"),
];
