import express from "express";
import { getProducts, getProductById } from "./product.controller";
import { productIdValidator } from "./product.validator";

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", productIdValidator, getProductById);

export default router;
