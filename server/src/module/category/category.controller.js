import {
  createCategoryService,
  deleteCategoryService,
  getCategoriesService,
  updateCategoryService,
} from "./category.service";
import { validationResult } from "express-validator";
import { ApiResponse } from "@/utils/ApiResponse";
import { ApiError } from "@/utils/ApiError";

export const createCategory = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new ApiError(400, errors.array()[0].msg);
  }

  const { name, description } = req.body;

  const category = await createCategoryService({
    name,
    description,
  });

  res
    .status(201)
    .json(new ApiResponse(201, "Category created successfully", category));
};

export const getCategories = async (req, res) => {
  const categories = await getCategoriesService();

  res
    .status(200)
    .json(new ApiResponse(200, "Categories fetched successfully", categories));
};

export const updateCategory = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new ApiError(400, errors.array()[0].msg);
  }

  const { id } = req.params;
  const { name, description } = req.body;

  const category = await updateCategoryService(id, { name, description });

  res
    .status(200)
    .json(new ApiResponse(200, "Category updated successfully", category));
};

export const deleteCategory = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new ApiError(400, errors.array()[0].msg);
  }

  const { id } = req.params;

  await deleteCategoryService(id);

  res.status(200).json(new ApiResponse(200, "Category deleted successfully"));
};
