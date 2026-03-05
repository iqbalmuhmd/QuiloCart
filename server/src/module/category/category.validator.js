import { body, param } from "express-validator";

export const createCategoryValidator = [
  body("name")
    .notEmpty()
    .withMessage("Category name is required")
    .isString()
    .withMessage("Category name must be a string")
    .trim()
    .matches(/[a-zA-Z]/)
    .withMessage("Category name must contain letters"),

  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string")
    .trim(),
];

export const updateCategoryValidator = [
  param("id").isMongoId().withMessage("Invalid category id"),

  body("name")
    .optional()
    .isString()
    .withMessage("Category name must be a string")
    .trim()
    .matches(/[a-zA-Z]/)
    .withMessage("Category name must contain letters"),

  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string")
    .trim(),
];

export const deleteCategoryValidator = [
  param("id").isMongoId().withMessage("Invalid category id"),
];
