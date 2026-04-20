import cloudinary from "@/config/cloudinary";
import { ApiResponse } from "@/utils/ApiResponse";
import { ApiError } from "@/utils/ApiError";

export const uploadImage = async (req, res) => {
  if (!req.file) {
    throw new ApiError(400, "No file provided");
  }

  const result = await new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "ecom/general" },
      (error, result) => {
        if (error) return reject(new ApiError(500, "Cloudinary upload failed"));
        resolve(result);
      },
    );
    stream.end(req.file.buffer);
  });
  res.status(200).json(
    new ApiResponse(200, "Image uploaded successfully", {
      url: result.secure_url,
    }),
  );
};
