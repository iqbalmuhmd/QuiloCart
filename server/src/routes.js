import express from "express";
import authRoutes from "@/module/auth/auth.routes";

const router = express.Router();

// health check
router.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

// auth routes
router.use("/auth", authRoutes);

export default router;
