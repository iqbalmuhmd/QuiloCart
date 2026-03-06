import { ApiError } from "@/utils/ApiError";
import Category from "./category.model";

export const createCategoryService = async ({ name, description }) => {
  const existingCategory = await Category.findOne({ name });

  if (existingCategory) {
    throw new ApiError(409, "Category name already exists");
  }

  const category = await Category.create({
    name,
    description,
  });

  return category;
};

export const getCategoriesService = async () => {
  return await Category.find({ isActive: true });
};

export const updateCategoryService = async (id, { name, description }) => {
  if (name === undefined && description === undefined) {
    throw new ApiError(400, "No fields provided for update");
  }

  const category = await Category.findById(id);

  if (!category) {
    throw new ApiError(404, "Category not found");
  }

  if (name !== undefined) {
    const existingCategory = await Category.findOne({ name });

    if (existingCategory && existingCategory._id.toString() !== id) {
      throw new ApiError(409, "Category name already exists");
    }

    category.name = name;
  }

  if (description !== undefined) {
    category.description = description;
  }

  await category.save();

  return category;
};

export const deleteCategoryService = async (id) => {
  const category = await Category.findById(id);

  if (!category) {
    throw new ApiError(404, "Category not found");
  }

  category.isActive = false;

  await category.save();
};
