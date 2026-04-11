export const formatOrder = (order) => ({
  id: order._id,
  status: order.status,
  paymentStatus: order.paymentStatus,
  totalAmount: order.totalAmount,
  totalQuantity: order.totalQuantity,
  createdAt: order.createdAt,
  previewImage: order.items[0]?.image || null,
});

export const formatOrderDetail = (order) => ({
  id: order._id,
  status: order.status,
  paymentStatus: order.paymentStatus,
  paymentMethod: order.paymentMethod,
  razorpayPaymentId: order.razorpayPaymentId || null,
  totalAmount: order.totalAmount,
  totalQuantity: order.totalQuantity,
  createdAt: order.createdAt,
  items: order.items.map((item) => ({
    productId: item.productId,
    name: item.name,
    price: item.price,
    image: item.image,
    quantity: item.quantity,
  })),
  addressSnapshot: order.addressSnapshot,
});

export const formatMerchantOrderDetail = (order, merchantItems) => ({
  id: order._id,
  status: order.status,
  paymentStatus: order.paymentStatus,
  paymentMethod: order.paymentMethod,
  merchantTotalAmount: merchantItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  ),
  createdAt: order.createdAt,
  items: merchantItems.map((item) => ({
    productId: item.productId,
    name: item.name,
    price: item.price,
    image: item.image,
    quantity: item.quantity,
  })),
  addressSnapshot: order.addressSnapshot,
});
