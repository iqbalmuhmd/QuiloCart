import bcrypt from "bcryptjs";
import User from "@/module/user/user.model";
import Merchant from "@/module/merchant/merchant.model";
import Product from "../product/product.model";
import { ApiError } from "@/utils/ApiError";
import { signToken } from "@/utils/jwt";
import { PAYMENT_STATUS, USER_ROLES } from "@/utils/constants";
import { MERCHANT_STATUS } from "@/utils/constants";
import { formatOrder } from "@/module/order/order.utils.js";
import Order from "../order/order.model";

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

const formatMerchant = (merchant) => ({
  id: merchant._id,
  storeName: merchant.storeName,
  storeDescription: merchant.storeDescription,
  status: merchant.status,
  createdAt: merchant.createdAt,
});

export const approveMerchantService = async (merchantId) => {
  const merchant = await Merchant.findById(merchantId);

  if (!merchant) throw new ApiError(404, "Merchant not found");

  merchant.status = MERCHANT_STATUS.APPROVED;
  await merchant.save();

  return formatMerchant(merchant);
};

export const rejectMerchantService = async (merchantId) => {
  const merchant = await Merchant.findById(merchantId);

  if (!merchant) throw new ApiError(400, "Merchant not found");

  merchant.status = MERCHANT_STATUS.REJECTED;
  await merchant.save();

  return formatMerchant(merchant);
};

export const blockMerchantService = async (merchantId) => {
  const merchant = await Merchant.findById(merchantId);
  if (!merchant) throw new ApiError(404, "Merchant not found");

  merchant.status = MERCHANT_STATUS.BLOCKED;
  await merchant.save();

  const result = await Product.updateMany(
    { merchantId: merchant._id },
    { $set: { isActive: false } },
  );

  return {
    merchant: formatMerchant(merchant),
    deactivatedProducts: result.modifiedCount,
  };
};

export const getMerchantsByStatusService = async (status) => {
  const merchants = await Merchant.find({ status });
  return merchants.map(formatMerchant);
};

export const getMerchantByIdService = async (merchantId) => {
  const merchant = await Merchant.findById(merchantId);

  if (!merchant) throw new ApiError(404, "Merchant not found");

  const products = await Product.find({ merchantId: merchant._id }).select(
    "name price stock isActive",
  );

  return {
    ...formatMerchant(merchant),
    products: products.map((p) => ({
      id: p._id,
      name: p.name,
      price: p.price,
      stock: p.stock,
      isActive: p.isActive,
    })),
  };
};

export const getAllOrdersService = async () => {
  const orders = await Order.find({
    paymentStatus: { $ne: PAYMENT_STATUS.PENDING },
  }).sort({ createdAt: -1 });

  return orders.map(formatOrder);
};
