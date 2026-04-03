export const formatOrder = (order) => ({
  id: order._id,
  status: order.status,
  totalAmount: order.totalAmount,
  totalQuantity: order.totalQuantity,
  createdAt: order.createdAt,
  previewImage: order.items[0]?.image || null,
});

export const formatOrderDetail = (order) => ({
  id: order._id,
  status: order.status,
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
