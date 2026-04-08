import apiClient from "@/services/apiClient";

const WALLET_ROUTES = {
  WALLET: "/wallet",
  TRANSACTIONS: "/wallet/transactions",
};

export const getWallet = async () => {
  const response = await apiClient.get(WALLET_ROUTES.WALLET);

  return response.data.data;
};

export const getWalletTransactions = async (page = 1, limit = 10) => {
  const response = await apiClient.get(WALLET_ROUTES.TRANSACTIONS, {
    params: { page, limit },
  });

  return response.data.data;
};

const walletApi = {
  getWallet,
  getWalletTransactions,
};

export default walletApi;
