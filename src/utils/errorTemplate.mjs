const error = (err, res, msg = "") => {
  return res.status(err.statusCode).json({
    error: {
      message: msg ? msg : err.message,
      status: err.statusCode,
    },
  });
};

export default error;
