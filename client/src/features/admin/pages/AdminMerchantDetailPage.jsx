import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import adminApi from "@/features/admin/adminApi";
import { toast } from "@/hooks/use-toast";

const AdminMerchantDetailPage = () => {
  const { merchantId } = useParams();
  const navigate = useNavigate();
  const [merchant, setMerchant] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMerchant = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await adminApi.getMerchantById(merchantId);
        setMerchant(data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch merchant");
      } finally {
        setLoading(false);
      }
    };
    fetchMerchant();
  }, [merchantId]);

  const handleAction = async (action) => {
    try {
      await action(merchantId);
      navigate("/admin/merchants");
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Action failed",
        description: err.response?.data?.message || "Something went wrong",
      });
    }
  };

  if (loading) return <p className="p-6 text-muted-foreground">Loading...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;
  if (!merchant) return null;

  return (
    <div className="p-6 space-y-6 max-w-3xl">
      <Link
        to="/admin/merchants"
        className="text-sm text-muted-foreground hover:text-black"
      >
        ← Back to merchants
      </Link>

      {/* Merchant info */}
      <div className="border rounded-xl p-6 space-y-2">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">{merchant.storeName}</h1>
          <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
            {merchant.status}
          </span>
        </div>
        <p className="text-muted-foreground">{merchant.storeDescription}</p>
        <p className="text-xs text-muted-foreground">
          Applied: {new Date(merchant.createdAt).toLocaleDateString()}
        </p>
      </div>

      {/* Action buttons */}
      <div className="flex gap-2">
        {merchant.status === "PENDING" && (
          <>
            <button
              onClick={() => handleAction(adminApi.approveMerchant)}
              className="px-4 py-2 text-sm bg-green-600 text-white rounded-lg"
            >
              Approve
            </button>
            <button
              onClick={() => handleAction(adminApi.rejectMerchant)}
              className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg"
            >
              Reject
            </button>
          </>
        )}
        {merchant.status === "APPROVED" && (
          <button
            onClick={() => handleAction(adminApi.blockMerchant)}
            className="px-4 py-2 text-sm bg-yellow-600 text-white rounded-lg"
          >
            Block
          </button>
        )}
      </div>

      {/* Products */}
      <div className="space-y-3">
        <h2 className="text-lg font-medium">Products</h2>
        {merchant.products.length === 0 ? (
          <p className="text-muted-foreground text-sm">No products yet.</p>
        ) : (
          <div className="border rounded-xl divide-y">
            {merchant.products.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between p-4"
              >
                <div>
                  <p className="text-sm font-medium">{product.name}</p>
                  <p className="text-xs text-muted-foreground">
                    ₹{product.price} · Stock: {product.stock}
                  </p>
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    product.isActive
                      ? "bg-green-50 text-green-700"
                      : "bg-red-50 text-red-700"
                  }`}
                >
                  {product.isActive ? "Active" : "Inactive"}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminMerchantDetailPage;
