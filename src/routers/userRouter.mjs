import { Router } from "express";
import session from "express-session";
import {
  getAbout,
  getHome,
  getLogin,
  getLogout,
  getSignUp,
  postLogin,
  postSignUp,
} from "../controller/userController.mjs";
// import { userSession } from "../controller/userController.mjs";
// import {
//   userLoginPostRequest,
//   userSignupPostRequest,
// } from "../services/userService.mjs";
// import { isEmptyObj } from "../utils/helpers.mjs";
// import msgs from "../utils/msgs.mjs";
// import { validateLoginForm, validateSignupForm } from "../utils/validation.mjs";
const router = Router();

router.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  }),
);

router.get("/", getHome);
router.get("/about", getAbout);
router.get("/login", getLogin);
router.get("/signup", getSignUp);
router.get("/logout", getLogout);

router.post("/login", postLogin);
router.post("/signup", postSignUp);

export default router;
