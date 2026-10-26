import cloudinary from "../config/cloudinary.js";
import appError from "../utils/appError.js";

export const uploadProductImageService = (file) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "shopease/products",
        resource_type: "image",
      },
      (error, result) => {
        if (error) {
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

    stream.end(file.buffer);
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
