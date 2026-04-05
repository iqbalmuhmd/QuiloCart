import Merchant from "@/module/merchant/merchant.model";
import { ApiError } from "@/utils/ApiError";
import { creditWallet } from "./wallet.service";

export const settleOrder = async (order, session) => {
  if (order.isSettled) {
    throw new ApiError(400, "Order already settled");
  }

  const merchantTotals = {};

  for (const item of order.items) {
    const id = item.merchantId.toString();

    if (!merchantTotals[id]) {
      merchantTotals[id] = 0;
    }

    merchantTotals[id] += item.price * item.quantity;
  }

  for (const [merchantId, total] of Object.entries(merchantTotals)) {
    const merchant = await Merchant.findById(merchantId).session(session);

    if (!merchant) {
      throw new ApiError(404, `Merchant not found: ${merchantId}`);
    }

    await creditWallet(
      merchant.userId,
      total,
      order._id,
      `Settlement for order #${order._id}`,
      session,
    );
  }

  order.isSettled = true;
  await order.save({ session });
};
