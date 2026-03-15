import { body } from "express-validator";

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
    .withMessage("Avatar must be a string URL")
];