import cloudinary from "../config/cloudinary.js";
import appError from "../utils/appError.js";

export const uploadProductImageService = (file) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "shopease/products",
        resource_type: "image",
        timeout: 120000, // 2 minutes
      },
      (error, result) => {
        if (error) {
          console.error("Cloudinary upload failed:", {
            message: error.message,
            http_code: error.http_code,
            name: error.name,
            fileSize: file.size,
          });

          return reject(
            appError(502, "Failed to upload image to Cloudinary")
          );
        }

        if (!result) {
          return reject(
            appError(502, "Cloudinary returned no upload result")
          );
        }

        resolve({
          image_url: result.secure_url,
          public_id: result.public_id,
        });
      }
    );

    uploadStream.on("error", (error) => {
      console.error("Cloudinary stream error:", error.message);
    });

    uploadStream.end(file.buffer);
  });
};

export const deleteProductImageService = async (publicId) => {
  const result = await cloudinary.uploader.destroy(publicId, {
    resource_type: "image",
  });

  if (result.result !== "ok" && result.result !== "not found") {
    throw appError(502, "Failed to delete image from Cloudinary");
  }

  return result;
};