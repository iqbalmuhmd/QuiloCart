import { param, body } from "express-validator";
import { ORDER_STATUS } from "@/utils/constants";

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

export const updateOrderStatusValidator = [
  param("id").isMongoId().withMessage("Invalid order ID"),

  body("status")
    .notEmpty()
    .withMessage("Status is required")
    .isIn([
      ORDER_STATUS.CONFIRMED,
      ORDER_STATUS.SHIPPED,
      ORDER_STATUS.DELIVERED,
    ])
    .withMessage("Invalid status"),
];
