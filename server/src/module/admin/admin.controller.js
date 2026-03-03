import { validationResult } from "express-validator";
import { approveMerchantService, loginAdmin } from "./admin.service";
import { ApiResponse } from "@/utils/ApiResponse";
import { ApiError } from "@/utils/ApiError";

export const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ApiError(400, errors.array()[0].msg);
  }

  const { email, password } = req.body;

  const result = await loginAdmin({ email, password });

  res.status(200).json(new ApiResponse(200, "Admin login successful", result));
};

export const approveMerchant = async (req, res) => {
  const merchantId = req.params.merchantId;

  const merchant = await approveMerchantService(merchantId);

  res
    .status(200)
    .json(new ApiResponse(200, "Merchant approved successfully", merchant));
};
