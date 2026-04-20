import express from "express";
import { authMiddleware } from "@/middleware/auth.middleware";
import { uploadSingle } from "@/middleware/upload.middleware";
import { uploadImage } from "./upload.controller";

const router = express.Router();

router.post("/", authMiddleware, uploadSingle, uploadImage);

export default router;
