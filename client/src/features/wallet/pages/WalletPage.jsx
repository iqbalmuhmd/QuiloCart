import useWallet from "@/hooks/useWallet";

const WalletPage = () => {
  const {
    balance,
    transactions,
    loading,
    loadingMore,
    error,
    hasMore,
    loadMore,
  } = useWallet();

  if (loading) {
    return <p className="p-6 text-muted-foreground">Loading...</p>;
  }

  if (error) {
    return <p className="p-6 text-red-600">{error}</p>;
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
        Wallet
      </p>

      <div className="border border-gray-200 rounded-xl p-6">
        <p className="text-xs text-muted-foreground">Available balance</p>
        <p className="text-2xl font-semibold mt-1">${balance}</p>
      </div>

      <div>
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
          Transaction history
        </p>

        {transactions.length === 0 ? (
          <div className="border border-gray-200 rounded-xl p-6 text-center">
            <p className="text-sm text-muted-foreground">No transactions yet</p>
          </div>
        ) : (
          <div className="border border-gray-200 rounded-xl divide-y">
            {transactions.map((tx, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        tx.type === "CREDIT"
                          ? "bg-green-50 text-green-700"
                          : "bg-red-50 text-red-700"
                      }`}
                    >
                      {tx.type}
                    </span>

                    <p className="text-sm font-medium">
                      {tx.type === "CREDIT" ? "+" : "-"}${tx.amount}
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {tx.description}
                  </p>
                </div>

                <p className="text-xs text-muted-foreground">
                  {new Date(tx.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
            ))}
          </div>
        )}

        {hasMore && (
          <button
            onClick={loadMore}
            disabled={loadingMore}
            className="w-full py-3 text-sm text-muted-foreground hover:text-black transition-colors mt-3"
          >
            {loadingMore ? "Loading..." : "Load more"}
          </button>
        )}
      </div>
    </div>
  );
};

export default WalletPage;
