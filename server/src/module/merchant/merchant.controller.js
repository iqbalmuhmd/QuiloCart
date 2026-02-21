import { validationResult } from "express-validator";
import {
  loginMerchantService,
  registerMerchantService,
} from "./merchant.service";
import { ApiResponse } from "@/utils/ApiResponse";
import { ApiError } from "@/utils/ApiError";

export const registerMerchant = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ApiError(400, errors.array()[0].msg);
  }

  const { name, email, password, storeName, storeDescription } = req.body;

  const result = await registerMerchantService({
    name,
    email,
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

export const loginMerchant = async (req, res) => {
  const { email, password } = req.body;

  const result = await loginMerchantService({ email, password });

  res
    .status(200)
    .json(new ApiResponse(200, "Merchant login successful", result));
};
