import jwt from "jsonwebtoken";
import { ApiError } from "@/utils/ApiError";

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new ApiError(401, "No token provided.");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    throw new ApiError(401, "Invalid token.");
  }
};
