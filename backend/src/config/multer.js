
import multer from "multer";
import appError from "../utils/appError.js";

const allowedMimeTypes = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
];

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (!allowedMimeTypes.includes(file.mimetype)) {
    return cb(
      appError(400, "Only JPEG, PNG, WebP, and AVIF images are allowed")
    );
  }

  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB per image
    files: 5,                  // Maximum 5 images per request
  },
});

export default upload;
