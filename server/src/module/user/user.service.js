import { ApiError } from "@/utils/ApiError";
import User from "./user.model";

export const getProfileService = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return user;
};

export const updateProfileService = async (userId, data) => {
  const { name, phone, avatar } = data;

  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (name !== undefined) user.name = name;
  if (phone !== undefined) user.phone = phone;
  if (avatar !== undefined) user.avatar = phone;

  await user.save();

  return user;
};
