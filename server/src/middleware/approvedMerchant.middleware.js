import Merchant from "@/module/merchant/merchant.model";
import { ApiError } from "@/utils/ApiError";
import { MERCHANT_STATUS } from "@/utils/constants";

export const approvedMerchantMiddleware = async (req, res, next) => {
  const merchant = await Merchant.findOne({ userId: req.user.userId });

  if (!merchant) {
    return next(new ApiError(403, "Merchant profile not found"));
  }

  if (merchant.status !== MERCHANT_STATUS.APPROVED) {
    return next(
      new ApiError(403, "Merchant account is pending admin approval"),
    );
  }

  next();
};
