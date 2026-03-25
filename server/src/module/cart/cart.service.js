import Cart from "./cart.model";
import Product from "@/module/product/product.model";
import { ApiError } from "@/utils/ApiError";

export const addToCartService = async (userId, productId, quantity = 1) => {
  const product = await Product.findOne({
    _id: productId,
    isActive: true,
  });

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  if (product.stock === 0) {
    throw new ApiError(400, "Product is out of stock");
  }

  let cart = await Cart.findOne({ userId });

  if (!cart) {
    if (quantity > product.stock) {
      throw new ApiError(400, "Quantity exceeds available stock");
    }

    cart = await Cart.create({
      userId,
      items: [
        {
          productId,
          quantity,
        },
      ],
    });

    return cart;
  }

  const existingItem = cart.items.find(
    (item) => item.productId.toString() === productId,
  );

  if (existingItem) {
    const newQuantity = existingItem.quantity + quantity;

    if (newQuantity > product.stock) {
      throw new ApiError(400, "Quantity exceeds available stock");
    }

    existingItem.quantity = newQuantity;
  } else {
    if (quantity > product.stock) {
      throw new ApiError(400, "Quantity exceeds available stock");
    }

    cart.items.push({
      productId,
      quantity,
    });
  }

  await cart.save();

  return cart;
};

export const getCartService = async (userId) => {
  const cart = await Cart.findOne({ userId }).populate({
    path: "items.productId",
    select: "name price images merchantId isActive stock",
    populate: {
      path: "merchantId",
      select: "storeName",
    },
  });

  if (!cart) {
    return {
      cart: [],
      totalItems: 0,
      totalQuantity: 0,
      totalAmount: 0,
    };
  }

  let totalQuantity = 0;
  let totalAmount = 0;

  const formattedCart = cart.items.map((item) => {
    const product = item.productId;

    const isActive = product && product.isActive;
    const inStock = product && product.stock > 0;

    if (isActive && inStock) {
      totalQuantity += item.quantity;
      totalAmount += product.price * item.quantity;
    }

    return {
      id: item._id,
      product: {
        id: product?._id || null,
        name: product?.name || "Product unavailable",
        price: product?.price || 0,
        image: product?.images?.[0] || null,
        merchant: product?.merchantId?.storeName || null,
      },
      quantity: item.quantity,
      isActive,
      inStock,
    };
  });

  return {
    cart: formattedCart,
    totalItems: formattedCart.filter((item) => item.isActive && item.inStock)
      .length,
    totalQuantity,
    totalAmount,
  };
};

export const updateCartItemService = async (userId, itemId, quantity) => {
  const cart = await Cart.findOne({ userId });

  if (!cart) {
    throw new ApiError(404, "Cart not found");
  }

  const item = cart.items.id(itemId);

  if (!item) {
    throw new ApiError(404, "Cart item not found");
  }
  const product = await Product.findOne({
    _id: item.productId,
    isActive: true,
  });

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  if (quantity > product.stock) {
    throw new ApiError(400, "Quantity exceeds available stock");
  }

  item.quantity = quantity;

  await cart.save();

  return cart;
};

export const removeCartItemService = async (userId, itemId) => {
  const cart = await Cart.findOne({ userId });

  if (!cart) {
    throw new ApiError(404, "Cart not found");
  }
  const item = cart.items.id(itemId);

  if (!item) {
    throw new ApiError(404, "Cart item not found");
  }
  item.deleteOne();

  await cart.save();

  return null;
};
