import User from "@/module/user/user.model";
import Merchant from "./merchant.model";
import { ApiError } from "@/utils/ApiError";
import { USER_ROLES } from "@/utils/constants";
import { MERCHANT_STATUS } from "@/utils/constants";
import bcrypt from "bcryptjs";
import { signToken } from "@/utils/jwt";

export const registerMerchantService = async ({
  name,
  email,
  password,
  storeName,
  storeDescription,
}) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new ApiError(409, "Email already exists");

  const user = await User.create({
    name,
    email,
    password,
    role: "MERCHANT",
  });

  const merchant = await Merchant.create({
    userId: user._id,
    storeName,
    storeDescription,
    status: MERCHANT_STATUS.PENDING,
  });

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    merchant: {
      storeName: merchant.storeName,
      status: merchant.status,
    },
  };
};
