import { Router } from "express";
import {
  createCategoryController,
  getCategoriesController,
  getCategoryByIdController,
  updateCategoryController,
  deleteCategoryController,
  getCategoryBySlugController,
} from "../controllers/category.controller.js";

import {
  createCategorySchema,
  updateCategorySchema,
} from "../validations/category.validation.js";
import validate from "../middlewares/validate.middleware.js";

const router = Router();

router.post(
  "/",
  validate(createCategorySchema),
  createCategoryController
);

router.get("/", getCategoriesController);
router.get("/:id", getCategoryByIdController);
router.get("/slug/:slug", getCategoryBySlugController);

router.put(
  "/:id",
  validate(updateCategorySchema),
  updateCategoryController
);

router.delete("/:id", deleteCategoryController);

export default router;
