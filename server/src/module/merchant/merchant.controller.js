import { validationResult } from "express-validator";
import {
  registerMerchantService,
  getMerchantAnalyticsService,
} from "./merchant.service";
import { ApiResponse } from "@/utils/ApiResponse";
import { ApiError } from "@/utils/ApiError";

export const registerMerchant = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ApiError(400, errors.array()[0].msg);
  }

  const { name, email, phone, avatar, password, storeName, storeDescription } =
    req.body;

  const result = await registerMerchantService({
    name,
    email,
    phone,
    avatar,
    password,
    storeName,
    storeDescription,
  });

  res
    .status(201)
    .json(
      new ApiResponse(
        201,
        "Merchant registered successfully, waiting for admin approval",
        result,
      ),
    );
};

export const getMerchantAnalytics = async (req, res) => {
  const { period } = req.query;
  const merchantId = req.merchant._id;

  const data = await getMerchantAnalyticsService(merchantId, period);

  res
    .status(200)
    .json(new ApiResponse(200, "Analytics fetched successfully", data));
};
