import express from "express";
import { authMiddleware } from "@/middleware/auth.middleware";
import { roleMiddleware } from "@/middleware/role.middleware";
import { USER_ROLES } from "@/utils/constants";
import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "./category.controller";
import {
  createCategoryValidator,
  deleteCategoryValidator,
  updateCategoryValidator,
} from "./category.validator";

const router = express.Router();

const adminOnly = [authMiddleware, roleMiddleware(USER_ROLES.ADMIN)];

router
  .route("/")
  .get(getCategories)
  .post(...adminOnly, ...createCategoryValidator, createCategory);

router
  .route("/:id")
  .patch(...adminOnly, ...updateCategoryValidator, updateCategory)
  .delete(...adminOnly, ...deleteCategoryValidator, deleteCategory);

export default router;
