import { param, body } from "express-validator";

export const placeOrderValidator = [
  body("addressId")
    .notEmpty()
    .withMessage("Address ID is required")
    .isMongoId()
    .withMessage("Invalid address ID"),

  body("paymentMethod")
    .notEmpty()
    .withMessage("Payment method is required")
    .isIn(["COD", "ONLINE"])
    .withMessage("Payment method must be COD or ONLINE"),
];

export const orderIdValidator = [
  param("id").isMongoId().withMessage("Invalid order ID"),
];
