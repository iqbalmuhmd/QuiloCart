import { authMiddleware } from "@/middleware/auth.middleware";
import express from "express";
import {
  getProfile,
  updateProfile,
  createAddress,
  getAddresses,
  updateAddress,
  deleteAddress,
} from "./user.controller";
import {
  updateProfileValidator,
  createAddressValidator,
  updateAddressValidator,
} from "./user.validator";

const router = express.Router();

router
  .route("/profile")
  .get(authMiddleware, getProfile)
  .patch(authMiddleware, ...updateProfileValidator, updateProfile);

router
  .route("/addresses")
  .post(authMiddleware, ...createAddressValidator, createAddress)
  .get(authMiddleware, getAddresses);

router
  .route("/addresses/:id")
  .patch(authMiddleware, ...updateAddressValidator, updateAddress)
  .delete(authMiddleware, deleteAddress);

export default router;
