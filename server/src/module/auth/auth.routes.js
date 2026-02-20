import express from "express";

import {
  authCredentialsValidator,
  changePasswordValidator,
} from "./auth.validator";
import { changePassword, login, register } from "./auth.controller";
import { authMiddleware } from "@/middleware/auth.middleware";

const router = express.Router();

router.post("/register", ...authCredentialsValidator, register);

router.post("/login", ...authCredentialsValidator, login);

router.patch(
  "/change-password",
  authMiddleware,
  ...changePasswordValidator,
  changePassword,
);

export default router;
