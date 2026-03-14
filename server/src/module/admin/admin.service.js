import bcrypt from "bcryptjs";
import User from "@/module/user/user.model";
import Merchant from "@/module/merchant/merchant.model";
import { ApiError } from "@/utils/ApiError";
import { signToken } from "@/utils/jwt";
import { USER_ROLES } from "@/utils/constants";
import { MERCHANT_STATUS } from "@/utils/constants";

export const loginAdmin = async ({ email, password }) => {
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }

  if (user.role !== USER_ROLES.ADMIN) {
    throw new ApiError(403, "Invalid email or password");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new ApiError(401, "Invalid email or password");
  }

  const token = signToken({
    userId: user._id,
    role: USER_ROLES.ADMIN,
  });

  return {
    token,
    user: {
      userId: user._id,
      email: user.email,
      role: user.role,
    },
  };
};

export const approveMerchantService = async (merchantId) => {
  const merchant = await Merchant.findById(merchantId);

  if (!merchant) throw new ApiError(404, "Merchant not found");

  merchant.status = MERCHANT_STATUS.APPROVED;
  await merchant.save();

  return merchant;
};
