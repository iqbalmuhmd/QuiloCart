import express from "express";
import { loginMerchant, registerMerchant } from "./merchant.controller";
import { registerMerchantValidator } from "./merchant.validator";
import { loginValidator } from "@/module/auth/auth.validator";

const router = express.Router();

router.post("/register", ...registerMerchantValidator, registerMerchant);

router.post("/login", ...loginValidator, loginMerchant);

export default router;
