import { errorResponse } from "../utils/response.js";
import { ZodError } from "zod";

const validate = (schema) => (req, res, next) => {
  try {
    const parsed = schema.safeParse(req.body);

    if (!parsed.success) {
      errorResponse(
        res,
        400,
        "Validation Failed",
        parsed.error?.issues?.[0]?.message,
      );
    }

    req.body = parsed.data;

    return next();
  } catch (error) {
    if (error instanceof ZodError) {
      errorResponse(res, 400, "Validation Failed", error?.issues?.[0]?.message);
    }

    next(error);
  }
};

export default validate;