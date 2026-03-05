import express from "express";
import { authMiddleware } from "@/middleware/auth.middleware";
import { changePassword, getMe, login, register } from "./auth.controller";
import {
  changePasswordValidator,
  loginValidator,
  registerUserValidator,
} from "./auth.validator";

const router = express.Router();

router.route("/register").post(...registerUserValidator, register);
router.route("/login").post(...loginValidator, login);
router.route("/me").get(authMiddleware, getMe);

router
  .route("/change-password")
  .patch(authMiddleware, ...changePasswordValidator, changePassword);

export default router;
