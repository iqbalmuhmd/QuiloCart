import { validationResult } from "express-validator";
import {
  getProfileService,
  updateProfileService,
  createAddressService,
  getAddressesService,
  updateAddressService,
  deleteAddressService,
} from "./user.service";
import { ApiResponse } from "@/utils/ApiResponse";
import { ApiError } from "@/utils/ApiError";

export const getProfile = async (req, res) => {
  const user = await getProfileService(req.user.userId);

  res
    .status(200)
    .json(new ApiResponse(200, "Profile fetched successfully", user));
};

export const updateProfile = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new ApiError(400, errors.array()[0].msg);
  }

  const user = await updateProfileService(req.user.userId, req.body);

  res
    .status(200)
    .json(new ApiResponse(200, "Profile updated successfully", user));
};

export const createAddress = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ApiError(400, errors.array()[0].msg);
  }

  const address = await createAddressService(req.user.userId, req.body);

  res
    .status(201)
    .json(new ApiResponse(201, "Address created successfully", address));
};

export const getAddresses = async (req, res) => {
  const addresses = await getAddressesService(req.user.userId);

  res
    .status(200)
    .json(new ApiResponse(200, "Addresses fetched successfully", addresses));
};

export const updateAddress = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ApiError(400, errors.array()[0].msg);
  }

  const address = await updateAddressService(
    req.user.userId,
    req.params.id,
    req.body,
  );

  res
    .status(200)
    .json(new ApiResponse(200, "Address updated successfully", address));
};

export const deleteAddress = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ApiError(400, errors.array()[0].msg);
  }

  await deleteAddressService(req.user.userId, req.params.id);

  res
    .status(200)
    .json(new ApiResponse(200, "Address deleted successfully", null));
};
