import express from "express";
import {
  login,
  approveMerchant,
  rejectMerchant,
  blockMerchant,
  getMerchantsByStatus,
  getMerchantById,
  getAllOrders,
} from "./admin.controller";
import { loginValidator } from "@/module/auth/auth.validator";
import { authMiddleware } from "@/middleware/auth.middleware";
import { roleMiddleware } from "@/middleware/role.middleware";
import { USER_ROLES } from "@/utils/constants";

const router = express.Router();

const adminOnly = [authMiddleware, roleMiddleware(USER_ROLES.ADMIN)];

router.post("/login", ...loginValidator, login);

router.get("/merchants", ...adminOnly, getMerchantsByStatus);
router.get("/merchants/:merchantId", ...adminOnly, getMerchantById);
router.patch("/merchants/:merchantId/approve", ...adminOnly, approveMerchant);
router.patch("/merchants/:merchantId/reject", ...adminOnly, rejectMerchant);
router.patch("/merchants/:merchantId/block", ...adminOnly, blockMerchant);

router.get("/orders", ...adminOnly, getAllOrders);

export default router;
