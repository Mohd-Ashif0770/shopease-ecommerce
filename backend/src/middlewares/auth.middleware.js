
import jwt from "jsonwebtoken";
import appError from "../utils/appError.js";

const protect = (req, res, next) => {
  try {
    const authorization = req.headers.authorization;

    if (!authorization?.startsWith("Bearer ")) {
      throw appError(401, "Access token required");
    }

    const accessToken = authorization.split(" ")[1];

    if (!accessToken) {
      throw appError(401, "Access token required");
    }

    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);

    req.user = {
      id: decoded.userId,
      role: decoded.role,
    };

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError" || error.name === "JsonWebTokenError") {
      return next(appError(401, "Invalid or expired access token"));
    }

    next(error);
  }
};

export default protect;
