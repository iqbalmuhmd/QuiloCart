import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import adminApi from "@/features/admin/adminApi";
import { toast } from "@/hooks/use-toast";

const TABS = {
  PENDING: "PENDING",
  APPROVED: "APPROVED",
  BLOCKED: "BLOCKED",
  REJECTED: "REJECTED",
};

const AdminMerchantsPage = () => {
  const [activeTab, setActiveTab] = useState(TABS.PENDING);
  const [merchants, setMerchants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMerchants = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await adminApi.getMerchants(activeTab);
        setMerchants(data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch merchants");
      } finally {
        setLoading(false);
      }
    };
    fetchMerchants();
  }, [activeTab]);

  const handleAction = async (action, merchantId) => {
    try {
      await action(merchantId);
      setMerchants((prev) => prev.filter((m) => m.id !== merchantId));
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Action failed",
        description: err.response?.data?.message || "Something went wrong",
      });
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Merchants</h1>

      <div className="flex gap-2 border-b">
        {Object.values(TABS).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px ${
              activeTab === tab
                ? "border-black text-black"
                : "border-transparent text-muted-foreground hover:text-black"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {loading && <p className="text-muted-foreground">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && merchants.length === 0 && (
        <p className="text-muted-foreground">No merchants in this category.</p>
      )}

      {!loading && !error && merchants.length > 0 && (
        <div className="space-y-4">
          {merchants.map((merchant) => (
            <div
              key={merchant.id}
              className="border rounded-xl p-4 flex items-center justify-between"
            >
              <Link
                to={`/admin/merchants/${merchant.id}`}
                className="space-y-1"
              >
                <p className="font-medium">{merchant.storeName}</p>
                <p className="text-sm text-muted-foreground">
                  {merchant.storeDescription}
                </p>
                <p className="text-xs text-muted-foreground">
                  Applied: {new Date(merchant.createdAt).toLocaleDateString()}
                </p>
              </Link>

              <div className="flex gap-2">
                {activeTab === TABS.PENDING && (
                  <>
                    <button
                      onClick={() =>
                        handleAction(adminApi.approveMerchant, merchant.id)
                      }
                      className="px-3 py-1.5 text-sm bg-green-600 text-white rounded-lg"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() =>
                        handleAction(adminApi.rejectMerchant, merchant.id)
                      }
                      className="px-3 py-1.5 text-sm bg-red-600 text-white rounded-lg"
                    >
                      Reject
                    </button>
                  </>
                )}

                {activeTab === TABS.APPROVED && (
                  <button
                    onClick={() =>
                      handleAction(adminApi.blockMerchant, merchant.id)
                    }
                    className="px-3 py-1.5 text-sm bg-yellow-600 text-white rounded-lg"
                  >
                    Block
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminMerchantsPage;
