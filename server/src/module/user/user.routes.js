import { authMiddleware } from '@/middleware/auth.middleware';
import express from 'express'
import { getProfile, updateProfile } from './user.controller';
import { updateProfileValidator } from './user.validator';

const router = express.Router();

router
  .route("/profile")
  .get(authMiddleware, getProfile)
  .patch(authMiddleware, ...updateProfileValidator, updateProfile);

export default router;