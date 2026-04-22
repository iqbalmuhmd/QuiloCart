import { useState, useEffect } from "react";
import orderApi from "../orderApi";
import { useParams, Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { ORDER_STATUS, PAYMENT_STATUS, PAYMENT_METHOD } from "@/constants";

const statusStyles = {
  [ORDER_STATUS.CREATED]: "bg-blue-50 text-blue-700",
  [ORDER_STATUS.CONFIRMED]: "bg-purple-50 text-purple-700",
  [ORDER_STATUS.SHIPPED]: "bg-yellow-50 text-yellow-700",
  [ORDER_STATUS.DELIVERED]: "bg-green-50 text-green-700",
  [ORDER_STATUS.CANCELLED]: "bg-red-50 text-red-700",
};

const paymentStatusStyles = {
  [PAYMENT_STATUS.PAID]: "bg-green-50 text-green-700",
  [PAYMENT_STATUS.COD]: "bg-gray-100 text-gray-600",
  [PAYMENT_STATUS.PENDING]: "bg-yellow-50 text-yellow-700",
  [PAYMENT_STATUS.FAILED]: "bg-red-50 text-red-700",
  [PAYMENT_STATUS.REFUNDED]: "bg-blue-50 text-blue-700",
};

const canCancel = (status) =>
  status === ORDER_STATUS.CREATED || status === ORDER_STATUS.CONFIRMED;

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

  if (loading) {
    return <p className="p-6 text-muted-foreground">Loading...</p>;
  }

  if (error) {
    return <p className="p-6 text-red-600">{error}</p>;
  }

  if (!order) return null;

  return (
    <div className="space-y-6 max-w-3xl">
      {order.paymentStatus === PAYMENT_STATUS.REFUNDED && (
        <div className="border border-blue-200 bg-blue-50 text-blue-700 rounded-xl p-4">
          <p className="text-sm font-medium">
            ${order.totalAmount} has been refunded to your wallet
          </p>
        </div>
      )}

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

        <div className="flex items-center gap-2">
          <span
            className={`text-xs px-2 py-0.5 rounded-full font-medium ${
              statusStyles[order.status] || "bg-gray-100 text-gray-600"
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

          {canCancel(order.status) && (
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

      <div>
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
          Order summary
        </p>

        <div className="border border-gray-200 rounded-xl p-4 space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <p>Payment method</p>
            <p>
              {order.paymentMethod === PAYMENT_METHOD.COD
                ? "Cash on delivery"
                : "Online payment"}
            </p>
          </div>

          {order.paymentStatus === PAYMENT_STATUS.PAID &&
            order.razorpayPaymentId && (
              <div className="flex justify-between text-sm text-muted-foreground">
                <p>Payment ID</p>
                <p className="font-mono text-xs">{order.razorpayPaymentId}</p>
              </div>
            )}

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
