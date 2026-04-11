import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import merchantApi from "../merchantApi";
import {
  statusStyles,
  paymentStatusStyles,
  NEXT_TRANSITION,
} from "@/utils/order.utils";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const MerchantOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [updating, setUpdating] = useState(null);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        setLoading(true);
        const data = await merchantApi.getMerchantOrders();
        setOrders(data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  const handleStatusUpdate = async (e, orderId, nextStatus) => {
    e.preventDefault();
    try {
      setUpdating(orderId);
      await merchantApi.updateOrderStatus(orderId, nextStatus);
      const data = await merchantApi.getMerchantOrders();
      setOrders(data);
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: err.response?.data?.message || "Failed to update status",
      });
    } finally {
      setUpdating(null);
    }
  };

  if (loading) return <p className="p-6 text-muted-foreground">Loading...</p>;
  if (error) return <p className="p-6 text-red-600">{error}</p>;

  return (
    <div className="space-y-6 max-w-3xl">
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
        Orders
      </p>

      {orders.length === 0 ? (
        <p className="text-muted-foreground text-sm">No orders yet.</p>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => {
            const transition = NEXT_TRANSITION[order.status];

            return (
              <Link
                key={order.id}
                to={`/merchant/orders/${order.id}`}
                className="block border border-gray-200 rounded-xl p-4 hover:border-gray-400 transition-colors"
              >
                <div className="flex items-center gap-4">
                  {order.previewImage && (
                    <img
                      src={order.previewImage}
                      alt="Order preview"
                      className="w-14 h-14 rounded-lg object-cover border border-gray-100 flex-shrink-0"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-medium">
                        {order.totalQuantity}{" "}
                        {order.totalQuantity === 1 ? "item" : "items"}
                      </p>
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                            statusStyles[order.status] ||
                            "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {order.status}
                        </span>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                            paymentStatusStyles[order.paymentStatus] ||
                            "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {order.paymentStatus}
                        </span>
                        {transition && (
                          <Button
                            size="sm"
                            onClick={(e) =>
                              handleStatusUpdate(e, order.id, transition.next)
                            }
                            disabled={updating === order.id}
                          >
                            {updating === order.id
                              ? "Updating..."
                              : transition.label}
                          </Button>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      ${order.merchantTotalAmount}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {new Date(order.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MerchantOrdersPage;
