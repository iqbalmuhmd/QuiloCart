import { ApiError } from "@/utils/ApiError";

export const roleMiddleware = (allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return next(new ApiError(403, "Access denied"));
    }
    next();
  };
};
