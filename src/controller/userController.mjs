import e from "express";
import session from "express-session";
import { login, signup } from "../services/userService.mjs";
import catchAsync from "../utils/catchAsync.mjs";
import { isEmptyObj } from "../utils/helpers.mjs";
import msgs from "../utils/msgs.mjs";
import { errorTemplate, successTemplate } from "../utils/resTemplates.mjs";
import { validateLoginForm, validateSignupForm } from "../utils/validation.mjs";

/**
 * @type {session}
 */
let userSession = session;

/** Returns the Home Page with User Session
 * @param {e.Request} req
 * @param {e.Response} res
 * @param {e.Next} next
 */
export const getHome = catchAsync(async function (req, res, next) {
  userSession = req.session;
  return successTemplate(res, "home", "Home", userSession, null);
});

/** Returns About Page
 * @param {e.Request} req
 * @param {e.Response} res
 * @param {e.Next} next
 * @param {object} session
 */
export const getAbout = catchAsync(async function (req, res, next) {
  userSession = req.session;
  return successTemplate(res, "about", "About", userSession, null);
});

/** Returns User Log Out Page
 * @param {e.Request} req
 * @param {e.Response} res
 * @param {e.Next} next
 * @param {object} session
 */
export const getLogout = catchAsync(async function (req, res, next) {
  req.session.destroy(null);
  userSession = "undefined";
  return successTemplate(res, "home", "Home", userSession, msgs.logout);
});

/** Returns User Login Page
 * @param {e.Request} req
 * @param {e.Response} res
 * @param {e.Next} next
 * @param {object} session
 */
export const getLogin = catchAsync(async function (req, res, next) {
  userSession = req.session;
  return successTemplate(res, "login", "Login", userSession, null);
});

/** Returns User SignUp Page
 * @param {e.Request} req
 * @param {e.Response} res
 * @param {e.Next} next
 * @param {object} session
 */
export const getSignUp = catchAsync(async function (req, res, next) {
  userSession = req.session;
  return successTemplate(res, "signup", "SignUp", userSession, msgs.signup);
});

/**
 * Returns Handler Fn for User Login
 * @async
 * @param {e.Request} req
 * @param {e.Response} res
 * @param {e.NextFunction} next
 * @returns {e.Response}
 */
export const postLogin = catchAsync(async function (req, res, next) {
  try {
    userSession = req.session;
    const errors = validateLoginForm(req.body);
    if (isEmptyObj(errors)) {
      const result = await login(req.body);
      const {
        result: { firstName },
        logged,
        token,
        message,
      } = result.data;
      userSession.name = firstName;
      userSession.logged = logged;
      userSession.token = token;

      return successTemplate(
        res,
        "home",
        "Home",
        userSession,
        message ?? msgs.loginSuccess,
      );
    } else {
      return errorTemplate(
        req,
        res,
        errors,
        "login",
        "Login",
        userSession,
        msgs.failed_login,
      );
    }
  } catch (err) {
    console.error(err);
    return errorTemplate(
      req,
      res,
      err,
      "login",
      "Login",
      "undefined",
      err.response.data.message ?? msgs.failed_login,
    );
  }
});

/**
 * Returns Handler Fn for User SignUp
 * @async
 * @param {e.Request} req
 * @param {e.Response} res
 * @param {e.NextFunction} next
 * @returns {e.Response}
 */
export const postSignUp = catchAsync(async function (req, res, next) {
  try {
    userSession = req.session;
    const errors = validateSignupForm(req.body);
    if (isEmptyObj(errors)) {
      const results = await signup(req.body);
      const { result, message } = results.data;
      return successTemplate(
        res,
        "login",
        "Login",
        userSession,
        message ?? msgs.signupSuccess,
        result,
      );
    } else {
      return errorTemplate(
        req,
        res,
        errors,
        "signup",
        "SignUp",
        userSession,
        msgs.failed_signup,
      );
    }
  } catch (err) {
    console.error(err);
    return errorTemplate(
      req,
      res,
      err,
      "signup",
      "SignUp",
      "undefined",
      err.message,
    );
  }
});
