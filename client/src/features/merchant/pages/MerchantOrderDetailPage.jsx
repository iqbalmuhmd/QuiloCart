import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import merchantApi from "../merchantApi";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import {
  statusStyles,
  paymentStatusStyles,
  NEXT_TRANSITION,
} from "@/utils/order.utils";

const MerchantOrderDetailPage = () => {
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const loadOrder = async () => {
      try {
        setLoading(true);
        const data = await merchantApi.getMerchantOrderById(id);
        setOrder(data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load order");
      } finally {
        setLoading(false);
      }
    };

    loadOrder();
  }, [id]);

  const handleStatusUpdate = async () => {
    try {
      setUpdating(true);
      const updated = await merchantApi.updateOrderStatus(
        order.id,
        transition.next,
      );
      setOrder(updated);
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: err.response?.data?.message || "Failed to update status",
      });
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <p className="p-6 text-muted-foreground">Loading...</p>;
  if (error) return <p className="p-6 text-red-600">{error}</p>;
  if (!order) return null;

  const transition = NEXT_TRANSITION[order.status];

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Order details
        </p>
        <Link
          to="/merchant/orders"
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
          {transition && (
            <Button size="sm" onClick={handleStatusUpdate} disabled={updating}>
              {updating ? "Updating..." : transition.label}
            </Button>
          )}
        </div>
      </div>

      <div>
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
          Your items
        </p>
        <div className="border border-gray-200 rounded-xl divide-y">
          {order.items.map((item, index) => (
            <div key={index} className="flex gap-3 items-center p-4">
              {item.image && (
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-14 h-14 rounded-lg object-cover border border-gray-100 flex-shrink-0"
                />
              )}
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
          Settlement
        </p>
        <div className="border border-gray-200 rounded-xl p-4">
          <div className="flex justify-between text-sm font-medium">
            <p>Your earnings</p>
            <p>${order.merchantTotalAmount}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MerchantOrderDetailPage;
