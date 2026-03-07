import Category from "../category/category.model";
import Product from "./product.model";
import { ApiError } from "@/utils/ApiError";

export const createProductService = async (data, merchantId) => {
  const { categoryId } = data;

  const category = await Category.findOne({
    _id: categoryId,
    isActive: true,
  });

  if (!category) {
    throw new ApiError(404, "Category not found");
  }

  const product = await Product.create({
    ...data,
    merchantId,
  });

  return product;
};

export const getMerchantProductsService = async (merchantId) => {
  const products = await Product.find({
    merchantId,
    isActive: true,
  });

  return products;
};

export const updateProductService = async (
  productId,
  updateData,
  merchantId,
) => {
  const { name, description, price, stock, images, categoryId } = updateData;

  const hasUpdates = Object.values(updateData).some((v) => v !== undefined);
  if (!hasUpdates) {
    throw new ApiError(400, "No fields provided for update");
  }

  const product = await Product.findOne({ _id: productId, merchantId });
  if (!product) throw new ApiError(404, "Product not found");

  if (name !== undefined) product.name = name;
  if (description !== undefined) product.description = description;
  if (price !== undefined) product.price = price;
  if (stock !== undefined) product.stock = stock;
  if (images !== undefined) product.images = images;

  if (categoryId !== undefined) {
    const category = await Category.findOne({
      _id: categoryId,
      isActive: true,
    });
    if (!category) throw new ApiError(404, "Category not found");
    product.categoryId = categoryId;
  }

  await product.save();
  return product;
};

export const deleteProductService = async (productId, merchantId) => {
  const product = await Product.findOne({
    _id: productId,
    merchantId,
  });

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  product.isActive = false;

  await product.save();
};
