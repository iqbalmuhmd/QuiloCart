import express from "express";
import { loginMerchant, registerMerchant } from "./merchant.controller";
import { registerMerchantValidator } from "./merchant.validator";
import { authCredentialsValidator } from "../auth/auth.validator";

const router = express.Router();

router.post("/register", ...registerMerchantValidator, registerMerchant);

router.post("/login", ...authCredentialsValidator, loginMerchant)

export default router;
