import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { updateCartItem, removeCartItem, clearError } from "../cartSlice";

const CartPage = () => {
  const { toast } = useToast();
  const dispatch = useDispatch();

  const { items, totalAmount, loading, error } = useSelector(
    (state) => state.cart,
  );
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error,
      });
      dispatch(clearError());
    }
  }, [error, toast, dispatch]);

  const handleIncrease = async (item) => {
    try {
      setUpdatingId(item.id);
      await dispatch(
        updateCartItem({
          itemId: item.id,
          quantity: item.quantity + 1,
        }),
      ).unwrap();
    } catch (err) {
      // handled by redux + useEffect toast
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDecrease = async (item) => {
    if (item.quantity === 1) return;
    try {
      setUpdatingId(item.id);
      await dispatch(
        updateCartItem({
          itemId: item.id,
          quantity: item.quantity - 1,
        }),
      ).unwrap();
    } catch (err) {
      // handled by redux + useEffect toast
    } finally {
      setUpdatingId(null);
    }
  };

  const handleRemove = async (item) => {
    try {
      setUpdatingId(item.id);
      await dispatch(removeCartItem(item.id)).unwrap();
    } catch (err) {
      // handled by redux + useEffect toast
    } finally {
      setUpdatingId(null);
    }
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
                disabled={updatingId === item.id}
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
                    disabled={updatingId === item.id}
                    onClick={() => handleDecrease(item)}
                    className="px-2 py-1 border rounded disabled:opacity-50"
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    disabled={updatingId === item.id}
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
