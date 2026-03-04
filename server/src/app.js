import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import routes from "@/routes.js";

import { errorHandler } from "./middleware/error.middleware.js";
import { ApiError } from "@/utils/ApiError";
import { config } from "./config/env.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: config.clientUrl,
    credentials: true,
  }),
);

app.use(express.json());

app.use("/api", routes);

app.use((req, res, next) => {
  next(new ApiError(404, `Route ${req.originalUrl} not found`));
});

app.use(errorHandler);

export default app;
