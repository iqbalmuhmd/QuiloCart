import Wishlist from "./wishlist.model";
import Product from "@/module/product/product.model";
import { ApiError } from "@/utils/ApiError";

export const addToWishlistService = async (userId, productId) => {
  const product = await Product.findOne({
    _id: productId,
    isActive: true,
  });

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  const wishlistItem = await Wishlist.create({
    userId,
    productId,
  });

  return wishlistItem;
};

export const getWishlistService = async (userId) => {
  const items = await Wishlist.find({ userId }).populate({
    path: "productId",
    select: "name price images merchantId isActive",
    populate: {
      path: "merchantId",
      select: "storeName",
    },
  });

  const wishlist = items
    .filter((item) => item.productId && item.productId.isActive)
    .map((item) => ({
      product: {
        id: item.productId._id,
        name: item.productId.name,
        price: item.productId.price,
        image: item.productId.images?.[0] || null,
        merchant: item.productId.merchantId?.storeName || null,
      },
    }));

  return wishlist;
};

export const removeFromWishlistService = async (userId, productId) => {
  const deletedItem = await Wishlist.findOneAndDelete({
    userId,
    productId,
  });

  if (!deletedItem) {
    throw new ApiError(404, "Wishlist item not found");
  }

  return null;
};
