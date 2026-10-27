import { Router } from "express";
import upload from "../config/multer.js";
import validate from "../middlewares/validate.middleware.js";
import { createProductSchema } from "../validations/product.validation.js";
import { createProductController, getProductsController } from "../controllers/product.controller.js";

const router = Router();

router.post(
  "/",
  upload.array("images", 5),
  validate(createProductSchema),
  createProductController
);
router.get("/", getProductsController);

export default router;
