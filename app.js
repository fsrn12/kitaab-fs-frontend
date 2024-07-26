import express from "express";
import errorHandler from "./src/controller/errorController.mjs";
import authorRouter from "./src/routers/authorRouter.mjs";
import bookRouter from "./src/routers/bookRouter.mjs";
import userRouter from "./src/routers/userRouter.mjs";
import AppError from "./src/utils/appError.mjs";
import { __dirname, getDir, require } from "./src/utils/helpers.mjs";

const app = express();
app.disable("x-powered-by");

app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: true, limit: "20kb" }));

app.set("public", getDir("public"));
app.set("views", getDir("views"));
app.set("view engine", "ejs");
app.engine("ejs", require("ejs").__express);
app.use(express.static(getDir("public")));
app.use(express.static(getDir("views")));

app.use("/", userRouter);
app.use("/books", bookRouter);
app.use("/authors", authorRouter);

app.use((req, res, next) => {
  req.session.destroy(null);
  return res.status(404).render("404");
});
//-- ERROR HANDLING
app.all("*", (req, res, next) => {
  return next(new AppError(`ERROR: Can't find ${req.originalUrl}`, 404));
});

app.use((err, req, res, next) => {
  return res.status(err.statusCode || 500).json({
    message: err.message,
    status: err.statusCode,
  });
});

app.use(errorHandler);
export default app;
