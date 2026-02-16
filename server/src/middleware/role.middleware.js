import { ApiError } from "@/utils/ApiError";

export const roleMiddleware = (allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      throw new ApiError(403, "Access denied");
    }
    next();
  };
};
