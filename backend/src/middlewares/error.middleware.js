const errorhandler = (err, req, res, next) => {
  const { statusCode = 500, message = "Internal server error" } = err;

  res.status(statusCode).json({
    success: false,
    message: message,
  });
};

export default errorhandler;