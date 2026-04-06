import express from "express";
import { authMiddleware } from "@/middleware/auth.middleware";
import { getWallet, getWalletTransactions } from "./wallet.controller";

const router = express.Router();

router.get("/", authMiddleware, getWallet);
router.get("/transactions", authMiddleware, getWalletTransactions);

export default router;
