import { body } from "express-validator";

export const registerMerchantValidator = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters"),

  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format"),

  body("phone")
    .optional()
    .isMobilePhone()
    .withMessage("Valid phone number is required"),

  body("avatar")
    .optional()
    .isString()
    .withMessage("Avatar must be a string"),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),

  body("storeName")
    .notEmpty()
    .withMessage("Store name is required")
    .isLength({ min: 3 })
    .withMessage("Store name must be at least 3 characters"),

  body("storeDescription")
    .optional()
    .isLength({ max: 500 })
    .withMessage("Description cannot exceed 500 characters"),
];
