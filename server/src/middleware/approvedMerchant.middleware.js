import Merchant from "@/module/merchant/merchant.model";
import { ApiError } from "@/utils/ApiError";
import { MERCHANT_STATUS } from "@/utils/constants";

export const approvedMerchantMiddleware = async (req, res, next) => {
  const merchant = await Merchant.findOne({ userId: req.user.userId });

  if (!merchant) {
    return next(new ApiError(403, "Merchant profile not found"));
  }

  if (merchant.status !== MERCHANT_STATUS.APPROVED) {
    const messages = {
      [MERCHANT_STATUS.PENDING]: "Your application is under review",
      [MERCHANT_STATUS.REJECTED]: "Your application was rejected",
      [MERCHANT_STATUS.BLOCKED]: "Your account has been suspended",
    };
    return next(new ApiError(403, messages[merchant.status]));
  }

  req.merchant = merchant;

  next();
};
