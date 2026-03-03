import express from "express";
import { registerMerchant } from "./merchant.controller";
import { registerMerchantValidator } from "./merchant.validator";

const router = express.Router();

router.post("/register", ...registerMerchantValidator, registerMerchant);

export default router;
