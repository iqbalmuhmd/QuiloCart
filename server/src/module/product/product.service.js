import Category from "@/module/category/category.model";
import Product from "./product.model";
import { ApiError } from "@/utils/ApiError";
import Wishlist from "../wishlist/wishlist.model";
import Cart from "../cart/cart.model";

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

  const product = await Product.findOne({
    _id: productId,
    merchantId,
  });
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

  await Promise.all([
    Wishlist.deleteMany({ productId: product._id }),
    Cart.updateMany({}, { $pull: { items: { productId: product._id } } }),
  ]);

  await product.save();
};

export const getProductsService = async ({ page, limit, category, search }) => {
  const skip = (page - 1) * limit;

  const query = { isActive: true };

  // CATEGORY FILTER
  if (category) {
    const categoryExists = await Category.findOne({
      _id: category,
      isActive: true,
    });

    if (!categoryExists) {
      throw new ApiError(404, "Category not found");
    }

    query.categoryId = category;
  }

  // SEARCH FILTER
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ];
  }

  const [products, total] = await Promise.all([
    Product.find(query)
      .populate("categoryId", "name")
      .populate("merchantId", "storeName")
      .skip(skip)
      .limit(limit),

    Product.countDocuments(query),
  ]);

  const formattedProducts = products.map((p) => ({
    _id: p._id,
    name: p.name,
    description: p.description,
    price: p.price,
    stock: p.stock,
    images: p.images,
    category: {
      name: p.categoryId?.name,
    },
    merchant: {
      storeName: p.merchantId?.storeName,
    },
  }));

  return {
    products: formattedProducts,
    total,
    page,
    limit,
  };
};

export const getProductByIdService = async (id) => {
  const product = await Product.findOne({
    _id: id,
    isActive: true,
  })
    .populate("categoryId", "name")
    .populate("merchantId", "storeName");

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  return {
    _id: product._id,
    name: product.name,
    description: product.description,
    price: product.price,
    stock: product.stock,
    images: product.images,
    categoryId: product.categoryId?._id,
    category: {
      name: product.categoryId?.name,
    },
    merchant: {
      storeName: product.merchantId?.storeName,
    },
  };
};
