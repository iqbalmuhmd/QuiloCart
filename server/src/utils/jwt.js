import jwt from "jsonwebtoken";

import { config } from "@/config/env";
import { ApiError } from "@/utils/ApiError";

export const signToken = (payload) => {
  return jwt.sign(payload, config.jwt.secret, {
    expiresIn: "7d",
  });
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, config.jwt.secret);
  } catch (err) {
    throw new ApiError(401, "Invalid or expired token");
  }
};
