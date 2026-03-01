import express from "express";

import {
  changePasswordValidator,
  loginValidator,
  registerUserValidator,
} from "./auth.validator";
import { changePassword, getMe, login, register } from "./auth.controller";
import { authMiddleware } from "@/middleware/auth.middleware";

const router = express.Router();

router.post("/register", ...registerUserValidator, register);

router.post("/login", ...loginValidator, login);

router.get("/me", authMiddleware, getMe);

router.patch(
  "/change-password",
  authMiddleware,
  ...changePasswordValidator,
  changePassword,
);

export default router;
