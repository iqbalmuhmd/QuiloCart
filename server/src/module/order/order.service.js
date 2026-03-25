import Cart from "@/module/cart/cart.model";
import User from "@/module/user/user.model";
import { ApiError } from "@/utils/ApiError";

export const checkoutService = async (userId, addressId) => {
  const cart = await Cart.findOne({ userId }).populate({
    path: "items.productId",
    select: "name price images isActive stock",
  });

  if (!cart || cart.items.length === 0) {
    throw new ApiError(400, "Cart is empty");
  }

  let totalQuantity = 0;
  let totalAmount = 0;

  const validatedItems = [];

  for (const item of cart.items) {
    const product = item.productId;

    if (!product || !product.isActive) {
      throw new ApiError(
        400,
        "Some items in your cart are unavailable. Please update your cart.",
      );
    }

    if (product.stock === 0) {
      throw new ApiError(
        400,
        "Some items are out of stock. Please update your cart.",
      );
    }

    if (item.quantity > product.stock) {
      throw new ApiError(
        400,
        "Some items exceed available stock. Please update your cart.",
      );
    }

    totalQuantity += item.quantity;
    totalAmount += product.price * item.quantity;

    validatedItems.push({
      product: {
        id: product._id,
        name: product.name,
        price: product.price,
        image: product.images?.[0] || null,
      },
      quantity: item.quantity,
    });
  }

  const user = await User.findById(userId).select("addresses");

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const address = user.addresses.id(addressId);

  if (!address) {
    throw new ApiError(404, "Address not found");
  }

  return {
    items: validatedItems,
    totalItems: validatedItems.length,
    totalQuantity,
    totalAmount,
    address,
  };
};
