import { validationResult } from "express-validator";
import { ApiResponse } from "@/utils/ApiResponse";
import { ApiError } from "@/utils/ApiError";
import { registerUser, loginUser } from "./auth.service";

export const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ApiError(400, errors.array()[0].msg);
  }

  const { email, password } = req.body;

  const user = await registerUser({
    email,
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
