import Cart from "@/module/cart/cart.model";
import User from "@/module/user/user.model";
import Product from "@/module/product/product.model";
import Order from "./order.model";
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

export const placeOrderService = async (userId, addressId) => {
  return withTransaction(async (session) => {
    const cart = await Cart.findOne({ userId })
      .populate({
        path: "items.productId",
        select: "name price images isActive stock",
      })
      .session(session);

    if (!cart || cart.items.length === 0) {
      throw new ApiError(400, "Cart is empty");
    }

    let totalQuantity = 0;
    let totalAmount = 0;

    const orderItems = [];

    for (const item of cart.items) {
      const product = item.productId;

      if (!product || !product.isActive) {
        throw new ApiError(
          400,
          "Some items are unavailable. Please update your cart.",
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

      orderItems.push({
        productId: product._id,
        name: product.name,
        price: product.price,
        image: product.images?.[0] || null,
        quantity: item.quantity,
      });
    }

    const user = await User.findById(userId)
      .select("addresses")
      .session(session);

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    const address = user.addresses.id(addressId);

    if (!address) {
      throw new ApiError(404, "Address not found");
    }

    const [order] = await Order.create(
      [
        {
          userId,
          items: orderItems,
          totalAmount,
          totalQuantity,
          addressSnapshot: {
            name: address.name,
            phone: address.phone,
            addressLine1: address.addressLine1,
            addressLine2: address.addressLine2,
            city: address.city,
            state: address.state,
            postalCode: address.postalCode,
            country: address.country,
          },
        },
      ],
      { session },
    );

    for (const item of orderItems) {
      const updated = await Product.findOneAndUpdate(
        {
          _id: item.productId,
          stock: { $gte: item.quantity },
        },
        {
          $inc: { stock: -item.quantity },
        },
        { session },
      );

      if (!updated) {
        throw new ApiError(
          400,
          "Some items are no longer available in required quantity.",
        );
      }
    }

    cart.items = [];
    await cart.save({ session });

    return order;
  });
};

export const getOrdersService = async (userId) => {
  const orders = await Order.find({ userId }).sort({ createdAt: -1 });

  return orders;
};

export const getOrderByIdService = async (userId, orderId) => {
  const order = await Order.findOne({
    _id: orderId,
    userId,
  });

  if (!order) {
    throw new ApiError(404, "Order not found");
  }

  return order;
};

export const cancelOrderService = async (userId, orderId) => {
  const order = await Order.findOne({
    _id: orderId,
    userId,
  });

  if (!order) {
    throw new ApiError(404, "Order not found");
  }

  if (order.status !== "CREATED") {
    throw new ApiError(400, "Order cannot be cancelled");
  }

  order.status = "CANCELLED";
  await order.save();

  return null;
};
