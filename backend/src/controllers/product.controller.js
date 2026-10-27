import {
  createProductService,
  getProductsService,
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

    return successResponse(res, 201, "Product created successfully",result);
  } catch (error) {
    return next(error);
  }
};
