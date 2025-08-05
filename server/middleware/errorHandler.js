const ErrorHandler = (err, req, res, next) => {
  console.error("Middleware Error Handling");
  console.error("Error:", err);
  console.error("Request Body:", req.body);
  console.error("Request Query:", req.query);

  const errStatus = err.statusCode || 500;
  const errMsg = err.message || 'Something went wrong';

  res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMsg,
    stack: process.env.NODE_ENV === 'development' ? err.stack : {}
  });
};

export default ErrorHandler;
