import { validationResult } from "express-validator";
import { ApiResponse } from "@/utils/ApiResponse";
import { ApiError } from "@/utils/ApiError";
import {
  registerUser,
  loginUser,
  changeUserPassword,
  getUserById,
} from "./auth.service";
import { formatUserResponse } from "./auth.helper";

export const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ApiError(400, errors.array()[0].msg);
  }

  const { name, email, phone, avatar, password } = req.body;

  const user = await registerUser({
    name,
    email,
    phone,
    avatar,
    password,
  });

  res
    .status(201)
    .json(new ApiResponse(201, "User registered successfully", user));
};

export const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ApiError(400, errors.array()[0].msg);
  }

  const { email, password } = req.body;

  const result = await loginUser({
    email,
    password,
  });

  res.status(200).json(new ApiResponse(200, "Login successful", result));
};

export const getMe = async (req, res) => {
  const user = await getUserById(req.user.userId);
  res.json(
    new ApiResponse(200, "Authenticated user", await formatUserResponse(user)),
  );
};

export const changePassword = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ApiError(400, errors.array()[0].msg);
  }
  const { currentPassword, newPassword } = req.body;
  const userId = req.user.userId;

  await changeUserPassword(userId, currentPassword, newPassword);

  return res
    .status(200)
    .json(new ApiResponse(200, "Password changed successfully"));
};
