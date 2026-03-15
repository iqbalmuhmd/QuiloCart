import { ApiResponse } from "@/utils/ApiResponse";
import { getProfileService, updateProfileService } from "./user.service";
import { validationResult } from "express-validator";
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