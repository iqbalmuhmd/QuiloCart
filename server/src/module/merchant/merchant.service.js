import User from "@/module/user/user.model";
import Merchant from "./merchant.model";
import Order from "../order/order.model";
import { ApiError } from "@/utils/ApiError";
import { USER_ROLES } from "@/utils/constants";
import { MERCHANT_STATUS } from "@/utils/constants";
import { withTransaction } from "@/utils/withTransaction";
import mongoose from "mongoose";

export const registerMerchantService = async ({
  name,
  email,
  phone,
  avatar,
  password,
  storeName,
  storeDescription,
}) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new ApiError(409, "Email already exists");

  return withTransaction(async (session) => {
    const [user] = await User.create(
      [
        {
          name,
          email,
          phone,
          avatar,
          password,
          role: USER_ROLES.MERCHANT,
        },
      ],
      { session },
    );

    const [merchant] = await Merchant.create(
      [
        {
          userId: user._id,
          storeName,
          storeDescription,
          status: MERCHANT_STATUS.PENDING,
        },
      ],
      { session },
    );

    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        avatar: user.avatar,
        role: user.role,
      },
      merchant: {
        storeName: merchant.storeName,
        status: merchant.status,
      },
    };
  });
};

const PERIOD_FORMAT = {
  daily: "%Y-%m-%d",
  weekly: "%Y-%U",
  monthly: "%Y-%m",
};

export const getMerchantAnalyticsService = async (merchantId, period) => {
  const format = PERIOD_FORMAT[period] ?? PERIOD_FORMAT.monthly;

  const chartData = await Order.aggregate([
    { $match: { status: "DELIVERED" } },
    { $unwind: "$items" },
    { $match: { "items.merchantId": new mongoose.Types.ObjectId(merchantId) } },
    {
      $group: {
        _id: { $dateToString: { format, date: "$createdAt" } },
        revenue: { $sum: { $multiply: ["$items.price", "$items.quantity"] } },
        orders: { $addToSet: "$_id" },
        products: {
          $push: { name: "$items.name", quantity: "$items.quantity" },
        },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  const bestSellingProductResult = await Order.aggregate([
    { $match: { status: "DELIVERED" } },
    { $unwind: "$items" },
    {
      $match: {
        "items.merchantId": new mongoose.Types.ObjectId(merchantId),
      },
    },
    {
      $group: {
        _id: "$items.name",
        unitsSold: { $sum: "$items.quantity" },
      },
    },
    { $sort: { unitsSold: -1 } },
    { $limit: 1 },
    {
      $project: {
        _id: 0,
        name: "$_id",
        unitsSold: 1,
      },
    },
  ]);

  const totalRevenue = chartData.reduce((sum, d) => sum + d.revenue, 0);
  const totalOrders = chartData.reduce((sum, d) => sum + d.orders.length, 0);
  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
  const bestSellingProduct = bestSellingProductResult[0] || {
    name: null,
    unitsSold: 0,
  };

  return {
    summary: {
      totalRevenue,
      totalOrders,
      averageOrderValue,
      bestSellingProduct,
    },
    chart: chartData.map(({ _id, revenue, orders }) => ({
      period: _id,
      revenue,
      orders: orders.length,
    })),
  };
};
