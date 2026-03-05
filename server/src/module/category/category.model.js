import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

categorySchema.pre("save", async function () {
  if (!this.isModified("name")) return;

  this.slug = this.name.toLowerCase().trim().replace(/\s+/g, "-");
});

const Category = mongoose.model("Category", categorySchema);

export default Category;
