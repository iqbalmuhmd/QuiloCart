import express from "express";
import authRoutes from "@/module/auth/auth.routes";
import merchantRoutes from "@/module/merchant/merchant.routes";
import adminRoutes from "@/module/admin/admin.routes";
import categoryRoutes from "@/module/category/category.routes";
import productRoutes from "@/module/product/product.routes";

const router = express.Router();

// health check
router.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

// auth routes
router.use("/auth", authRoutes);

// merchant routes
router.use("/merchant", merchantRoutes);

// admin routes
router.use("/admin", adminRoutes);

// category routes
router.use("/categories", categoryRoutes);

// product routes
router.use("/products", productRoutes)

export default router;
