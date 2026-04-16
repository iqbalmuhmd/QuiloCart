import express from "express";
import { registerMerchant, getMerchantAnalytics } from "./merchant.controller";
import { registerMerchantValidator } from "./merchant.validator";
import { authMiddleware } from "@/middleware/auth.middleware";
import { approvedMerchantMiddleware } from "@/middleware/approvedMerchant.middleware";

const router = express.Router();

router.post("/register", ...registerMerchantValidator, registerMerchant);

router
  .route("/analytics")
  .get(authMiddleware, approvedMerchantMiddleware, getMerchantAnalytics);

export default router;
