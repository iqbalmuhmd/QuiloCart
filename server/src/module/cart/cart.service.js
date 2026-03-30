import Cart from "./cart.model";
import Product from "@/module/product/product.model";
import { ApiError } from "@/utils/ApiError";
import { formatCart } from "./cart.utils";

const getPopulatedCart = (userId) =>
  Cart.findOne({ userId }).populate({
    path: "items.productId",
    select: "name price images merchantId isActive stock",
    populate: {
      path: "merchantId",
      select: "storeName",
    },
  });

export const addToCartService = async (userId, productId, quantity = 1) => {
  const product = await Product.findOne({ _id: productId, isActive: true });

  if (!product) throw new ApiError(404, "Product not found");
  if (product.stock === 0) throw new ApiError(400, "Product is out of stock");

  let cart = await Cart.findOne({ userId });

  if (!cart) {
    if (quantity > product.stock)
      throw new ApiError(400, "Quantity exceeds available stock");
    cart = await Cart.create({ userId, items: [{ productId, quantity }] });
  } else {
    const existingItem = cart.items.find(
      (item) => item.productId.toString() === productId,
    );

    if (existingItem) {
      const newQuantity = existingItem.quantity + quantity;
      if (newQuantity > product.stock)
        throw new ApiError(400, "Quantity exceeds available stock");
      existingItem.quantity = newQuantity;
    } else {
      if (quantity > product.stock)
        throw new ApiError(400, "Quantity exceeds available stock");
      cart.items.push({ productId, quantity });
    }

    await cart.save();
  }

  const updatedCart = await getPopulatedCart(userId);
  return formatCart(updatedCart);
};

export const getCartService = async (userId) => {
  const updatedCart = await getPopulatedCart(userId);
  return formatCart(updatedCart);
};

export const updateCartItemService = async (userId, itemId, quantity) => {
  const cart = await Cart.findOne({ userId });

  if (!cart) throw new ApiError(404, "Cart not found");

  const item = cart.items.id(itemId);
  if (!item) throw new ApiError(404, "Cart item not found");

  const product = await Product.findOne({
    _id: item.productId,
    isActive: true,
  });
  if (!product) throw new ApiError(404, "Product not found");

  if (quantity > product.stock)
    throw new ApiError(400, "Quantity exceeds available stock");

  item.quantity = quantity;
  await cart.save();

  const updatedCart = await getPopulatedCart(userId);
  return formatCart(updatedCart);
};

export const removeCartItemService = async (userId, itemId) => {
  const cart = await Cart.findOne({ userId });

  if (!cart) throw new ApiError(404, "Cart not found");

  const item = cart.items.id(itemId);
  if (!item) throw new ApiError(404, "Cart item not found");

  item.deleteOne();
  await cart.save();

  const updatedCart = await getPopulatedCart(userId);
  return formatCart(updatedCart);
};
