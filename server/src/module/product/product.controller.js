import { validationResult } from "express-validator";
import { ApiError } from "@/utils/ApiError";
import { ApiResponse } from "@/utils/ApiResponse";
import {
  createProductService,
  getMerchantProductsService,
  updateProductService,
  deleteProductService,
  getProductsService,
  getProductByIdService,
} from "./product.service";

// @access  Private (Merchant)
export const createProduct = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new ApiError(400, errors.array()[0].msg);
  }

  const product = await createProductService(req.body, req.merchant._id);

  res
    .status(201)
    .json(new ApiResponse(201, "Product created successfully", product));
};

export const getMerchantProducts = async (req, res) => {

  const products = await getMerchantProductsService(req.merchant._id);

  res
    .status(200)
    .json(new ApiResponse(200, "Products fetched successfully", products));
};

export const updateProduct = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new ApiError(400, errors.array()[0].msg);
  }

  const product = await updateProductService(
    req.params.id,
    req.body,
    req.merchant._id,
  );

  res
    .status(200)
    .json(new ApiResponse(200, "Product updated successfully", product));
};

export const deleteProduct = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new ApiError(400, errors.array()[0].msg);
  }

  await deleteProductService(req.params.id, req.merchant._id);

  res.status(200).json(new ApiResponse(200, "Product deleted successfully"));
};

// @access  Public
export const getProducts = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new ApiError(400, errors.array()[0].msg);
  }

  const { page = 1, limit = 10, category, search } = req.query;

  const result = await getProductsService({
    page: Number(page),
    limit: Number(limit),
    category,
    search,
  });

  res
    .status(200)
    .json(new ApiResponse(200, "Products fetched successfully", result));
};

export const getProductById = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new ApiError(400, errors.array()[0].msg);
  }

  const { id } = req.params;

  const product = await getProductByIdService(id);

  res
    .status(200)
    .json(new ApiResponse(200, "Product fetched successfully", product));
};
