import Wallet from "./wallet.model";
import Transaction from "./transaction.model";
import { ApiError } from "@/utils/ApiError";
import { TRANSACTION_TYPE } from "@/utils/constants";

export const getOrCreateWallet = async (userId, session) => {
  const wallet = await Wallet.findOneAndUpdate(
    { userId },
    { $setOnInsert: { userId, balance: 0 } },
    { upsert: true, returnDocument: "after", session },
  );

  return wallet;
};

export const creditWallet = async (
  userId,
  amount,
  orderId,
  description,
  session,
) => {
  const wallet = await getOrCreateWallet(userId, session);

  wallet.balance += amount;
  await wallet.save({ session });

  await Transaction.create(
    [
      {
        walletId: wallet._id,
        type: TRANSACTION_TYPE.CREDIT,
        amount,
        orderId: orderId || null,
        description: description || null,
      },
    ],
    { session },
  );

  return wallet;
};

export const debitWallet = async (
  userId,
  amount,
  orderId,
  description,
  session,
) => {
  const wallet = await getOrCreateWallet(userId, session);

  if (wallet.balance < amount) {
    throw new ApiError(400, "Insufficient wallet balance");
  }

  wallet.balance -= amount;
  await wallet.save({ session });

  await Transaction.create(
    [
      {
        walletId: wallet._id,
        type: TRANSACTION_TYPE.DEBIT,
        amount,
        orderId: orderId || null,
        description: description || null,
      },
    ],
    { session },
  );

  return wallet;
};

export const getWalletService = async (userId) => {
  const wallet = await Wallet.findOne({ userId });

  if (!wallet) {
    return { balance: 0 };
  }

  return { balance: wallet.balance };
};

export const getWalletTransactionsService = async (
  userId,
  page = 1,
  limit = 10,
) => {
  const wallet = await Wallet.findOne({ userId });

  if (!wallet) {
    return { transactions: [], total: 0, page, limit };
  }

  const skip = (page - 1) * limit;

  const [transactions, total] = await Promise.all([
    Transaction.find({ walletId: wallet._id })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    Transaction.countDocuments({ walletId: wallet._id }),
  ]);

  return {
    transactions: transactions.map((t) => ({
      type: t.type,
      amount: t.amount,
      description: t.description,
      orderId: t.orderId,
      createdAt: t.createdAt,
    })),
    total,
    page,
    limit,
  };
};
