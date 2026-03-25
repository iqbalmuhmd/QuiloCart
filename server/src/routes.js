import express from "express";
import authRoutes from "@/module/auth/auth.routes";
import userRoutes from "@/module/user/user.routes";
import merchantRoutes from "@/module/merchant/merchant.routes";
import adminRoutes from "@/module/admin/admin.routes";
import categoryRoutes from "@/module/category/category.routes";
import merchantProductRoutes from "@/module/product/merchantProduct.routes";
import publicProductRoutes from "@/module/product/publicProduct.routes";
import wishlistRoutes from "@/module/wishlist/wishlist.routes";
import cartRoutes from "@/module/cart/cart.routes";
import orderRoutes from "@/module/order/order.routes";

const router = express.Router();

// Auth
router.use("/auth", authRoutes);

// @access  Public
router.use("/products", publicProductRoutes);
router.use("/categories", categoryRoutes);

// @access Private (User)
router.use("/wishlist", wishlistRoutes);
router.use("/cart", cartRoutes);
router.use("/orders", orderRoutes);
router.use("/", userRoutes);

// @access  Private (Merchant)
router.use("/merchant/products", merchantProductRoutes);
router.use("/merchant", merchantRoutes);

// @access  Private (Admin)
router.use("/admin", adminRoutes);

export default router;
