import Wallet from "./wallet.model";
import Transaction from "./transaction.model";
import { ApiError } from "@/utils/ApiError";
import { TRANSACTION_TYPE } from "@/utils/constants";

export const getOrCreateWallet = async (userId, session) => {
  const wallet = await Wallet.findOneAndUpdate(
    { userId },
    { $setOnInsert: { userId, balance: 0 } },
    { upsert: true, new: true, session },
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
