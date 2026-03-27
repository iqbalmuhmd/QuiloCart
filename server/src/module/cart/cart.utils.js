export const formatCart = (cart) => {
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

  const formattedCart = cart.items
    .filter((item) => item.productId && item.productId.isActive)
    .map((item) => {
      const product = item.productId;

      totalQuantity += item.quantity;
      totalAmount += product.price * item.quantity;

      return {
        id: item._id,
        product: {
          id: product._id,
          name: product.name,
          price: product.price,
          image: product.images?.[0] || null,
          merchant: product.merchantId?.storeName || null,
        },
        quantity: item.quantity,
      };
    });

  return {
    cart: formattedCart,
    totalItems: formattedCart.length,
    totalQuantity,
    totalAmount,
  };
};
