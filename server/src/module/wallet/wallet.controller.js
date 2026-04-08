import {
  getWalletService,
  getWalletTransactionsService,
} from "./wallet.service";
import { ApiResponse } from "@/utils/ApiResponse";

export const getWallet = async (req, res) => {
  const result = await getWalletService(req.user.userId);

  res.status(200).json(new ApiResponse(200, "Wallet fetched", result));
};

export const getWalletTransactions = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const result = await getWalletTransactionsService(
    req.user.userId,
    page,
    limit,
  );

  res.status(200).json(new ApiResponse(200, "Transactions fetched", result));
};
