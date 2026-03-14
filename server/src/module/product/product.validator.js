import { body, param, query } from "express-validator";

export const createProductValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Product name is required")
    .matches(/[A-Za-z]/)
    .withMessage("Product name must contain at least one letter")
    .isLength({ min: 3, max: 25 })
    .withMessage("Product name must be between 3 and 120 characters"),

  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .isFloat({ min: 0 })
    .withMessage("Price must be a number greater than or equal to 0")
    .toFloat(),

  body("stock")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Stock cannot be negative")
    .toInt(),

  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string")
    .trim(),

  body("categoryId")
    .notEmpty()
    .withMessage("Category is required")
    .isMongoId()
    .withMessage("Invalid category ID"),

  body("images")
    .optional()
    .isArray()
    .withMessage("Product images format is invalid"),

  body("images.*")
    .optional()
    .isURL()
    .withMessage("Each image must be a valid URL"),
];

export const updateProductValidator = [
  param("id").isMongoId().withMessage("Invalid product id"),

  body("name")
    .optional()
    .isString()
    .withMessage("Product name must be text")
    .trim(),

  body("description")
    .optional()
    .isString()
    .withMessage("Description must be text")
    .trim(),

  body("price")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive number"),

  body("stock")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Stock cannot be negative"),

  body("images")
    .optional()
    .isArray()
    .withMessage("Images must be a list of image URLs"),

  body("categoryId").optional().isMongoId().withMessage("Invalid category id"),
];

export const productIdValidator = [
  param("id").isMongoId().withMessage("Invalid product id"),
];

export const categoryFilterValidator = [
  query("category")
    .optional({ values: "falsy" })
    .isMongoId()
    .withMessage("Invalid category id"),
];
