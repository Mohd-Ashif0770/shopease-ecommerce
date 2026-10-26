import {
  createCategoryService,
  getCategoriesService,
  getCategoryByIdService,
  getCategoryBySlugService,
  updateCategoryService,
  deleteCategoryService,
} from "../services/category.service.js";
import { successResponse } from "../utils/response.js";

export const createCategoryController = async (req, res, next) => {
  try {
    const category = await createCategoryService(req.body);

    return successResponse(res, 201, "Category created successfully", category);
  } catch (error) {
    next(error);
  }
};

export const getCategoriesController = async (req, res, next) => {
  try {
    const categories = await getCategoriesService();

    return successResponse(
      res,
      200,
      "Categories fetched successfully",
      categories,
    );
  } catch (error) {
    next(error);
  }
};

export const getCategoryByIdController = async (req, res, next) => {
  try {
    const category = await getCategoryByIdService(Number(req.params.id));

    return successResponse(res, 200, "Category fetched successfully", category);
  } catch (error) {
    next(error);
  }
};

export const getCategoryBySlugController = async (req, res, next) => {
  try {
    const category = await getCategoryBySlugService(req.params.slug);

    return successResponse(res, 200, "Category fetched successfully", category);
  } catch (error) {
    next(error);
  }
};

export const updateCategoryController = async (req, res, next) => {
  try {
    const category = await updateCategoryService(
      Number(req.params.id),
      req.body,
    );

    return successResponse(res, 200, "Category updated successfully", category);
  } catch (error) {
    next(error);
  }
};

export const deleteCategoryController = async (req, res, next) => {
  try {
    const category = await deleteCategoryService(Number(req.params.id));

    return successResponse(res, 200, "Category deleted successfully", category);
  } catch (error) {
    next(error);
  }
};
