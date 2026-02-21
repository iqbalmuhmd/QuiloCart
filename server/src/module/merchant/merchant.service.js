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

export const loginMerchantService = async ({ email, password }) => {
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }

  if (user.role !== USER_ROLES.MERCHANT) {
    throw new ApiError(403, "Not a merchant account");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new ApiError(401, "Invalid email or password");
  }

  const merchant = await Merchant.findOne({ userId: user._id });
  if (!merchant) {
    throw new ApiError(403, "Merchant profile not found");
  }

  const token = signToken({
    userId: user._id,
    role: USER_ROLES.MERCHANT,
  });

  return {
    token,
    user: {
      userId: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};
