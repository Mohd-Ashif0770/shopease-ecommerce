import {
  createProductService,
  deleteProductService,
  getProductsService,
  updateProductService,
} from "../services/product.service.js";
import { successResponse } from "../utils/response.js";

export const createProductController = async (req, res, next) => {
  try {
    const product = await createProductService(req.body, req.files);

    return successResponse(res, 201, "Product created successfully", product);
  } catch (error) {
    return next(error);
  }
};

export const getProductsController = async (req, res, next) => {
  try {
    const result = await getProductsService(req.query);

    return successResponse(res, 200, "Product fetched successfully", result);
  } catch (error) {
    return next(error);
  }
};

export const updateProductController = async (req, res, next) => {
  try {
    const product = await updateProductService(
      Number(req.params.id),
      req.body,
      req.files ?? [],
    );

    return successResponse(res, 200, "Product updated successfully", product);
  } catch (error) {
    return next(error);
  }
};

export const deleteProductController = async (req, res, next) => {
  try {
    const result = await deleteProductService(Number(req.params.id));

    return successResponse(
      res,
      200,
     "Product deleted successfully",
      result,
    );
  } catch (error) {
    return next(error);
  }
};
