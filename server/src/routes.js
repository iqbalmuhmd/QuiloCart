import express from "express";
import { authMiddleware } from "@/middleware/auth.middleware";

const router = express.Router();

router.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

router.get("/protected", authMiddleware, (req, res) => {
  res.json({ message: "You are authenticated", user: req.user });
});

export default router;
