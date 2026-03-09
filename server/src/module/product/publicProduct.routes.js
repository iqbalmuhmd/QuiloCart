import express from "express";
import { getProducts, getProductById } from "./product.controller";
import {
  categoryFilterValidator,
  productIdValidator,
} from "./product.validator";

const router = express.Router();

router.get("/", ...categoryFilterValidator, getProducts);
router.get("/:id", ...productIdValidator, getProductById);

export default router;
