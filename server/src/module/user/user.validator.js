import { body, param } from "express-validator";

export const updateProfileValidator = [
  body("firstName")
    .optional()
    .isString()
    .withMessage("First name must be a string")
    .trim(),

  body("lastName")
    .optional()
    .isString()
    .withMessage("Last name must be a string")
    .trim(),

  body("phone")
    .optional()
    .isString()
    .withMessage("Phone must be a string")
    .trim(),

  body("avatar")
    .optional()
    .isString()
    .withMessage("Avatar must be a string URL"),
];

export const createAddressValidator = [
  body("name").notEmpty().withMessage("Name is required").isString().trim(),

  body("phone")
    .notEmpty()
    .withMessage("Phone number is required")
    .isString()
    .trim(),

  body("addressLine1")
    .notEmpty()
    .withMessage("Address line 1 is required")
    .isString()
    .trim(),

  body("addressLine2").optional().isString().trim(),

  body("city").notEmpty().withMessage("City is required").isString().trim(),

  body("state").notEmpty().withMessage("State is required").isString().trim(),

  body("postalCode")
    .notEmpty()
    .withMessage("Postal code is required")
    .isString()
    .trim(),

  body("country")
    .notEmpty()
    .withMessage("Country is required")
    .isString()
    .trim(),

  body("isDefault")
    .optional()
    .isBoolean()
    .withMessage("isDefault must be true or false"),
];

export const updateAddressValidator = [
  param("id").isMongoId().withMessage("Invalid address id"),

  body("name").optional().isString().trim(),

  body("phone").optional().isString().trim(),

  body("addressLine1").optional().isString().trim(),

  body("addressLine2").optional().isString().trim(),

  body("city").optional().isString().trim(),

  body("state").optional().isString().trim(),

  body("postalCode").optional().isString().trim(),

  body("country").optional().isString().trim(),

  body("isDefault").optional().isBoolean(),
];
