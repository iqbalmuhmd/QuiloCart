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
    .filter((item) => item.productId)
    .map((item) => {
      const product = item.productId;
      const isActive = product.isActive;
      const inStock = product.stock > 0;

      if (isActive && inStock) {
        totalQuantity += item.quantity;
        totalAmount += product.price * item.quantity;
      }

      return {
        id: item._id,
        product: {
          id: product._id,
          name: product.name,
          price: product.price,
          stock: product.stock,
          image: product.images?.[0] || null,
          merchant: product.merchantId?.storeName || null,
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
