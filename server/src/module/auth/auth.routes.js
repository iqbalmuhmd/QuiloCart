import express from "express";

import { authCredentialsValidator } from "./auth.validator";
import { login, register } from "./auth.controller";

const router = express.Router();

router.post("/register", ...authCredentialsValidator, register);

router.post("/login", ...authCredentialsValidator, login);

export default router;
