
import { errorResponse } from "../utils/response.js";

const validate = (schema) => (req, res, next) => {
  const parsed = schema.safeParse(req.body);

  if (!parsed.success) {
    return errorResponse(
      res,
      400,
      "Validation Failed",
      parsed.error.issues[0]?.message
    );
  }

  req.body = parsed.data;
  return next();
};

export default validate;
