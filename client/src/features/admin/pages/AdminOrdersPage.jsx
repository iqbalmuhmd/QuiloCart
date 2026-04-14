import { useState, useEffect } from "react";
import adminApi from "@/features/admin/adminApi";
import { statusStyles, paymentStatusStyles } from "@/utils/order.utils";

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await adminApi.getAllOrders();
        setOrders(data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p className="p-6 text-muted-foreground">Loading...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">All Orders</h1>

      {orders.length === 0 ? (
        <p className="text-muted-foreground">No orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border rounded-xl p-4 flex items-center justify-between"
            >
              <div className="space-y-1">
                <p className="text-sm font-medium">Order #{order.id}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span
                  className={`text-xs px-2 py-1 rounded-full ${statusStyles[order.status]}`}
                >
                  {order.status}
                </span>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${paymentStatusStyles[order.paymentStatus]}`}
                >
                  {order.paymentStatus}
                </span>
                <p className="text-sm font-medium">${order.totalAmount}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminOrdersPage;
