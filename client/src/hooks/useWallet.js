import { useState, useEffect, useCallback } from "react";
import walletApi from "@/features/wallet/walletApi";

const useWallet = () => {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadWallet = async () => {
      try {
        setLoading(true);
        const [walletData, txData] = await Promise.all([
          walletApi.getWallet(),
          walletApi.getWalletTransactions(1, 10),
        ]);
        setBalance(walletData.balance);
        setTransactions(txData.transactions);
        setHasMore(txData.transactions.length < txData.total);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load wallet");
      } finally {
        setLoading(false);
      }
    };

    loadWallet();
  }, []);

  const loadMore = useCallback(async () => {
    const nextPage = page + 1;

    try {
      setLoadingMore(true);
      const txData = await walletApi.getWalletTransactions(nextPage, 10);

      setTransactions((prev) => [...prev, ...txData.transactions]);

      setPage(nextPage);
      setHasMore(txData.transactions.length === 10);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load transactions");
    } finally {
      setLoadingMore(false);
    }
  }, [page]);

  return {
    balance,
    transactions,
    loading,
    loadingMore,
    error,
    hasMore,
    loadMore,
  };
};

export default useWallet;
