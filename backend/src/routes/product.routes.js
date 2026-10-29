import { Router } from "express";
import upload from "../config/multer.js";
import validate from "../middlewares/validate.middleware.js";
import { createProductSchema, updateProductSchema } from "../validations/product.validation.js";
import { createProductController, deleteProductController, getProductsController, updateProductController } from "../controllers/product.controller.js";

const router = Router();

router.post(
  "/",
  upload.array("images", 5),
  validate(createProductSchema),
  createProductController
);
router.get("/", getProductsController);
router.put(
  "/:id",
  upload.array("images", 5),
  validate(updateProductSchema),
  updateProductController
);

router.delete("/:id", deleteProductController);

export default router;
