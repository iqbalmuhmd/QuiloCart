import express from "express";
import { approveMerchant, login } from "./admin.controller";
import { loginValidator } from "@/module/auth/auth.validator";
import { authMiddleware } from "@/middleware/auth.middleware";
import { roleMiddleware } from "@/middleware/role.middleware";
import { USER_ROLES } from "@/utils/constants";

const router = express.Router();

router.post("/login", ...loginValidator, login);

router.patch(
  "/merchants/:merchantId/approve",
  authMiddleware,
  roleMiddleware(USER_ROLES.ADMIN),
  approveMerchant,
);

export default router;
