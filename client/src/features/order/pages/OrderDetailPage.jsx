import { useState, useEffect } from "react";
import orderApi from "../orderApi";
import { useParams, Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

const OrderDetailPage = () => {
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    const loadOrder = async () => {
      try {
        setLoading(true);
        const data = await orderApi.getOrderById(id);
        setOrder(data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load order");
      } finally {
        setLoading(false);
      }
    };

    loadOrder();
  }, [id]);

  const handleCancel = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this order?",
    );
    if (!confirmed) return;

    try {
      setCancelling(true);
      const updated = await orderApi.cancelOrder(order.id);
      setOrder(updated);
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: err.response?.data?.message || "Failed to cancel order",
      });
    } finally {
      setCancelling(false);
    }
  };

  const statusStyles = {
    CREATED: "bg-blue-50 text-blue-700",
    SHIPPED: "bg-yellow-50 text-yellow-700",
    DELIVERED: "bg-green-50 text-green-700",
    CANCELLED: "bg-red-50 text-red-700",
    RETURN_REQUESTED: "bg-orange-50 text-orange-700",
    RETURNED: "bg-gray-100 text-gray-600",
  };

  if (loading) {
    return <p className="p-6 text-muted-foreground">Loading...</p>;
  }

  if (error) {
    return <p className="p-6 text-red-600">{error}</p>;
  }

  if (!order) return null;

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Order details
        </p>
        <Link
          to="/profile/orders"
          className="text-xs text-muted-foreground underline"
        >
          Back to orders
        </Link>
      </div>

      {/* Status + Date */}
      <div className="border border-gray-200 rounded-xl p-4 flex items-center justify-between">
        <div>
          <p className="text-xs text-muted-foreground">Placed on</p>
          <p className="text-sm font-medium mt-0.5">
            {new Date(order.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span
            className={`text-xs px-2 py-0.5 rounded-full font-medium ${
              statusStyles[order.status] || "bg-gray-100 text-gray-600"
            }`}
          >
            {order.status}
          </span>
          {order.status === "CREATED" && (
            <Button
              variant="destructive"
              size="sm"
              onClick={handleCancel}
              disabled={cancelling}
            >
              {cancelling ? "Cancelling..." : "Cancel order"}
            </Button>
          )}
        </div>
      </div>

      {/* Order Items */}
      <div>
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
          Items
        </p>
        <div className="border border-gray-200 rounded-xl divide-y">
          {order.items.map((item, index) => (
            <div key={index} className="flex gap-3 items-center p-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-14 h-14 rounded-lg object-cover border border-gray-100 flex-shrink-0"
              />
              <div className="flex-1">
                <p className="text-sm font-medium">{item.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  ${item.price} · Qty {item.quantity}
                </p>
              </div>
              <p className="text-sm font-medium">
                ${item.price * item.quantity}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Address Snapshot */}
      <div>
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
          Delivery address
        </p>
        <div className="border border-gray-200 rounded-xl p-4 space-y-0.5">
          <p className="text-sm font-medium">{order.addressSnapshot.name}</p>
          <p className="text-sm text-muted-foreground">
            {order.addressSnapshot.phone}
          </p>
          <p className="text-sm text-muted-foreground">
            {order.addressSnapshot.addressLine1}
            {order.addressSnapshot.addressLine2 &&
              `, ${order.addressSnapshot.addressLine2}`}
          </p>
          <p className="text-sm text-muted-foreground">
            {order.addressSnapshot.city}, {order.addressSnapshot.state},{" "}
            {order.addressSnapshot.postalCode}, {order.addressSnapshot.country}
          </p>
        </div>
      </div>

      {/* Order Summary */}
      <div>
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
          Order summary
        </p>
        <div className="border border-gray-200 rounded-xl p-4 space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <p>Total quantity</p>
            <p>
              {order.totalQuantity}{" "}
              {order.totalQuantity === 1 ? "item" : "items"}
            </p>
          </div>
          <div className="flex justify-between text-sm font-medium border-t border-gray-100 pt-2">
            <p>Total</p>
            <p>${order.totalAmount}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;
