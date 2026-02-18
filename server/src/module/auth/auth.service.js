import bcrypt from "bcryptjs";

import User from "@/module/user/user.model";
import { ApiError } from "@/utils/ApiError";
import { signToken } from "@/utils/jwt";

export const registerUser = async ({ email, password }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(409, "Email already exists");
  }

  const user = await User.create({
    email,
    password,
    role: "USER",
  });

  return {
    id: user._id,
    email: user.email,
    role: user.role,
  };
};

export const loginUser = async ({email, password}) => {
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
    user: {
      userId: user._id,
      email: user.email,
      role: user.role,
    },
  };
};
