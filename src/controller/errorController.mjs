import AppError from "../utils/appError.mjs";
import errorTemplate from "../utils/errorTemplate.mjs";

const handleCastErrorDB = function (err) {
  return new AppError(`Invalid ${err.path}: ${err.value}`, 400);
};

const handleDuplicateFieldDB = function (err) {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  const message = `Duplicate value: ${value}. Please use different value`;
  console.error(`Duplicate Error ${message}`);
  return new AppError(message, 409);
};

const handleValidationErrorDB = function (err) {
  const errors = Object.values(err.errors)
    .map((el) => el.message)
    .join(". ");
  const message = `Invalid input data, ${errors}`;
  return new AppError(message, 400);
};

const handleJWTError = function () {
  return new AppError("Login Failed!,\n Please try again");
};

const handleJWTExpiredError = function () {
  return new AppError("Login Session Expired!, Please login again");
};

/**=== === === === === ===
 * & PRODUCTION ERROR
 * === === === === === ===*/
const sendProdError = function (err, req, res) {
  //*API
  if (req.originalUrl.startsWith("/api")) {
    //#💡: OPERATIONAL ERROR: send info to client
    if (err.isOperational) {
      // return res.status(err.statusCode).json({
      //   message: err.message,
      //   status: err.status,
      // });
      return errorTemplate(err, res);
    }
    //#💡: PROGRAMMING ERROR: send info to client
    console.error(`ERROR 💥: ${err}`);
    return errorTemplate(err, res, "Something broke!!!");
    // return res.status(err.statusCode).json({
    //   message: "Something is broken!!!",
    //   status: "error"
    // })
  }
  //* Rendered Website
  if (err.isOperational) {
    //#💡: OPERATIONAL ERROR: send info to client
    return res.status(err.statusCode).render("error", {
      title: "Something went wrong!",
      msg: err.message,
    });
  }
  //#💡: PROGRAMMING/UNKNOWN ERROR: Don't leak error details to client
  console.error(`ERROR 💥: ${err}`);
  return res.status(err.statusCode).render("error", {
    title: "Something went wrong",
    msg: err.message,
  });
};
/**=== === === === === ===
 * & DEVELOPMENT ERROR
 * === === === === === ===*/
const sendDevError = function (err, req, res) {
  //* API
  if (req.originalUrl.startsWith("/api")) {
    return res.status(err.statusCode).join({
      status: err.status,
      message: err.message,
      error: err,
      stack: err.stack,
    });
    //* Rendered Website
  }
  console.error(`Error 💥: ${err}`);
  return res.status(err.statusCode).render("error", {
    title: "Something went wrong",
    msg: err.message,
  });
};

/**=== === === === === ===
 * & GLOBAL ERROR ERROR
 * === === === === === ===*/
export default (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (process.env.NODE_ENV === "development") {
    sendDevError(err, req, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err };
    error.message = err.message;

    console.error("GEH", error);
    if (error.name === "CastError") {
      error = handleCastErrorDB(error);
    }
    if (error.code === 11000) {
      error = handleDuplicateFieldDB(error);
    }
    if (error.name === "ValidationError") {
      error = handleValidationErrorDB(error);
    }
    if (error.name === "JsonWebTokenError") {
      error = handleJWTError();
    }
    if (error.name === "TokenExpiredError") {
      error = handleJWTExpiredError();
    }
    sendProdError(error, req, res);
  }
};
