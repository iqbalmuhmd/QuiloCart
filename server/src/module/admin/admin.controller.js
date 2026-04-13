import { validationResult } from "express-validator";
import { ApiResponse } from "@/utils/ApiResponse";
import { ApiError } from "@/utils/ApiError";
import {
  loginAdmin,
  approveMerchantService,
  rejectMerchantService,
  blockMerchantService,
  getMerchantsByStatusService,
  getMerchantByIdService,
  getAllOrdersService,
} from "./admin.service";

export const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) throw new ApiError(400, errors.array()[0].msg);

  const { email, password } = req.body;
  const result = await loginAdmin({ email, password });

  res.status(200).json(new ApiResponse(200, "Admin login successful", result));
};

export const getMerchantsByStatus = async (req, res) => {
  const { status } = req.query;
  const merchants = await getMerchantsByStatusService(status);

  res.status(200).json(new ApiResponse(200, "Merchants fetched", merchants));
};

export const getMerchantById = async (req, res) => {
  const { merchantId } = req.params;
  const merchant = await getMerchantByIdService(merchantId);

  res.status(200).json(new ApiResponse(200, "Merchant fetched", merchant));
};

export const approveMerchant = async (req, res) => {
  const { merchantId } = req.params;
  const merchant = await approveMerchantService(merchantId);

  res.status(200).json(new ApiResponse(200, "Merchant approved", merchant));
};

export const rejectMerchant = async (req, res) => {
  const { merchantId } = req.params;
  const merchant = await rejectMerchantService(merchantId);

  res.status(200).json(new ApiResponse(200, "Merchant rejected", merchant));
};

export const blockMerchant = async (req, res) => {
  const { merchantId } = req.params;
  const result = await blockMerchantService(merchantId);

  res.status(200).json(new ApiResponse(200, "Merchant blocked", result));
};

export const getAllOrders = async (req, res) => {
  const orders = await getAllOrdersService();

  res.status(200).json(new ApiResponse(200, "Orders fetched", orders));
};
