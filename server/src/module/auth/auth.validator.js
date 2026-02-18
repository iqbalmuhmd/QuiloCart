import { body } from "express-validator";

export const authCredentialsValidator = [
  body("email").isEmail().withMessage("Valid email required"),
  body("password").isLength({ min: 8 }).withMessage("Min 8 characters"),
];
