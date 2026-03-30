import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { updateCartItem, removeCartItem } from "../cartSlice";

const CartPage = () => {
  const { toast } = useToast();
  const dispatch = useDispatch();

  const { items, totalAmount, loading, error } = useSelector(
    (state) => state.cart,
  );

  useEffect(() => {
    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error,
      });
    }
  }, [error, toast]);

  const handleIncrease = (item) => {
    dispatch(
      updateCartItem({
        itemId: item.id,
        quantity: item.quantity + 1,
      }),
    );
  };

  const handleDecrease = (item) => {
    if (item.quantity === 1) return;

    dispatch(
      updateCartItem({
        itemId: item.id,
        quantity: item.quantity - 1,
      }),
    );
  };

  const handleRemove = (item) => {
    dispatch(removeCartItem(item.id));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Cart</h1>

      {items.length === 0 ? (
        <p className="text-muted-foreground">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="relative flex gap-4 border p-4 rounded-md"
            >
              <p className="absolute right-12 top-1/2 -translate-y-1/2 text-sm font-medium">
                ${item.quantity * item.product.price}
              </p>

              <button
                disabled={loading}
                onClick={() => handleRemove(item)}
                className="absolute right-2 top-1/2 -translate-y-1/2 px-2 py-1 border rounded font-semibold disabled:opacity-50"
              >
                X
              </button>

              <img
                src={item.product.image}
                alt={item.product.name}
                className="w-20 h-20 object-cover rounded"
              />

              <div className="flex-1 space-y-1">
                <p className="font-medium">{item.product.name}</p>
                <p className="text-sm text-muted-foreground">
                  ${item.product.price}
                </p>
                <p className="text-sm">Qty: {item.quantity}</p>

                <div className="flex items-center gap-2">
                  <button
                    disabled={loading}
                    onClick={() => handleDecrease(item)}
                    className="px-2 py-1 border rounded disabled:opacity-50"
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    disabled={loading}
                    onClick={() => handleIncrease(item)}
                    className="px-2 py-1 border rounded disabled:opacity-50"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}

          <div className="border p-4 rounded-md flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">Total</p>
              <p className="text-lg font-semibold">${totalAmount}</p>
            </div>

            <button
              disabled={items.length === 0 || loading}
              className="px-4 py-2 bg-black text-white rounded disabled:opacity-50"
            >
              {loading ? "Processing..." : "Checkout"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
