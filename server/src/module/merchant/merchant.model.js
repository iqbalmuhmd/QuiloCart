import mongoose from "mongoose";
import { MERCHANT_STATUS } from "@/utils/constants";

const merchantSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    storeName: {
      type: String,
      required: true,
      trim: true,
    },
    storeDescription: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: Object.values(MERCHANT_STATUS),
      default: MERCHANT_STATUS.PENDING,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Merchant", merchantSchema);
