import express from "express";
import { authMiddleware } from "@/middleware/auth.middleware";
import { roleMiddleware } from "@/middleware/role.middleware";
import { approvedMerchantMiddleware } from "@/middleware/approvedMerchant.middleware";
import { USER_ROLES } from "@/utils/constants";
import {
  createProduct,
  getMerchantProducts,
  updateProduct,
  deleteProduct,
} from "@/module/product/product.controller";
import {
  createProductValidator,
  updateProductValidator,
  deleteProductValidator,
} from "./product.validator";

const router = express.Router();

const merchantOnly = [authMiddleware, roleMiddleware(USER_ROLES.MERCHANT), approvedMerchantMiddleware];

router
  .route("/")
  .get(...merchantOnly, getMerchantProducts)
  .post(...merchantOnly, ...createProductValidator, createProduct);

router
  .route("/:id")
  .patch(...merchantOnly, ...updateProductValidator, updateProduct)
  .delete(...merchantOnly, ...deleteProductValidator, deleteProduct);

export default router;
