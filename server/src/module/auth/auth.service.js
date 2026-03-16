import bcrypt from "bcryptjs";

import User from "@/module/user/user.model";
import { formatUserResponse } from "./auth.helper.js";
import { ApiError } from "@/utils/ApiError";
import { signToken } from "@/utils/jwt";
import { USER_ROLES } from "@/utils/constants";

export const registerUser = async ({ name, email, phone, avatar, password }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(409, "Email already exists");
  }

  const user = await User.create({
    name,
    email,
    phone,
    avatar,
    password,
    role: USER_ROLES.USER,
  });

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    avatar: user.avatar,
    role: user.role,
  };
};

export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email }).select("+password");

  if (!user) throw new ApiError(401, "Invalid email or password");
  if (!user.isActive) throw new ApiError(403, "User account is disabled");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new ApiError(401, "Invalid email or password");

  const token = signToken({
    userId: user._id,
    role: user.role,
  });

  return {
    token,
    user: await formatUserResponse(user),
  };
};

export const getUserById = async (id) => {
  const user = await User.findById(id);
  if (!user) throw new ApiError(404, "User not found");
  return user;
};

export const changeUserPassword = async (
  userId,
  currentPassword,
  newPassword,
) => {
  const user = await User.findById(userId).select("+password");
  if (!user) throw new ApiError(404, "User not found");

  const isMatch = await bcrypt.compare(currentPassword, user.password);
  if (!isMatch) throw new ApiError(401, "Current password is incorrect");

  user.password = newPassword;
  await user.save();

  return true;
};
