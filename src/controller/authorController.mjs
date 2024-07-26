import e from "express";
import session from "express-session";
import {
  deleteAuthorAPI,
  getAuthorAPI,
  getAuthorById,
  postAuthorAPI,
  updateAuthorAPI,
} from "../services/authorService.mjs";
import { getAllBookIds, getBookAPI } from "../services/bookService.mjs";
import AppError from "../utils/appError.mjs";
import { isEmptyObj } from "../utils/helpers.mjs";
import msgs from "../utils/msgs.mjs";
import { errorTemplate, successTemplate } from "../utils/resTemplates.mjs";

/**
 * @type {session}
 */
let userSession = session;

/**
 * sets bearer token for user Authorization
 * @param {e.Request} req
 * @param {session} s
 */
const setAuth = (req, s) => {
  req.headers.authorization = `Bearer: ${userSession.token}`;
};

/**
 * Returns Handler Fn for Get All Authors Route
 * @async
 * @param {e.Request} req
 * @param {e.Response} res
 * @param {e.NextFunction} next
 * @returns {e.Response}
 */
export const getAuthors = async function (req, res, next) {
  try {
    userSession = req.session;
    setAuth(req, userSession);
    const { data } = await getAuthorAPI(req);
    const msg =
      isEmptyObj(data.result) || data.result.length < 1
        ? msgs.noAuthorsFound
        : data?.message ?? msgs.authorsFound;

    return successTemplate(
      res,
      "authors",
      "Authors",
      userSession,
      msg,
      data.result,
    );
    // msgs.authorsFound,
  } catch (err) {
    return errorTemplate(
      req,
      res,
      err,
      "home",
      "Home",
      userSession,
      err.response.data.message ?? msgs.noAuthorFound,
    );
  }
};

/**
 * Returns Handler Fn for Get Add Author Page
 * @async
 * @param {e.Request} req
 * @param {e.Response} res
 * @param {e.NextFunction} next
 * @returns {e.Response}
 */
export const getAddAuthor = async function (req, res, next) {
  try {
    userSession = req.session;
    setAuth(req, userSession);
    const { data } = await getAllBookIds(req);
    if (isEmptyObj(data.result) || data.result.length === 0) {
      throw new AppError(msgs.cantAddAuthor, 400);
    }
    return successTemplate(
      res,
      "addAuthor",
      "Add an Author",
      userSession,
      msgs.addAnAuthor,
      data.result,
    );
  } catch (err) {
    return errorTemplate(
      req,
      res,
      err,
      "books",
      "Books",
      userSession,
      err.message,
    );
  }
};

/**
 * Returns Handler Fn for Post a new Author Route
 * @async
 * @param {e.Request} req
 * @param {e.Response} res
 * @param {e.NextFunction} next
 * @returns {e.Response}
 */
export const postAuthor = async function (req, res, next) {
  try {
    userSession = req.session;
    setAuth(req, userSession);
    const { data } = await postAuthorAPI(req);
    const authors = await getAuthorAPI(req);
    const { result } = authors.data;

    const msg =
      isEmptyObj(data.result) || data.result.length < 1
        ? msgs.noBooksFound
        : data?.message ?? msgs.authorAdded;

    return successTemplate(res, "authors", "Authors", userSession, msg, result);
    // msgs.authorsFound,
  } catch (err) {
    return errorTemplate(
      req,
      res,
      err,
      "authors",
      "Authors",
      userSession,
      err.response.data.message ?? msgs.noAuthorFound,
    );
  }
};

/**
 * Returns Handler Fn for Get Edit Author Page
 * @async
 * @param {e.Request} req
 * @param {e.Response} res
 * @param {e.NextFunction} next
 * @returns {e.Response}
 */
export const getEditAuthor = async function (req, res, next) {
  try {
    userSession = req.session;
    setAuth(req, userSession);
    const { data } = await getAuthorById(req);

    return successTemplate(
      res,
      "editAuthor",
      "Edit Author",
      userSession,
      msgs.editAuthor,
      data.result,
    );
    // msgs.authorsFound,
  } catch (err) {
    return errorTemplate(
      req,
      res,
      err,
      "author",
      "Author",
      userSession,
      err.response.data.message ?? msgs.noAuthorFound,
    );
  }
};

/**
 * Returns Handler Fn for Update Author Route
 * @async
 * @param {e.Request} req
 * @param {e.Response} res
 * @param {e.NextFunction} next
 * @returns {e.Response}
 */
export const updateAuthor = async function (req, res, next) {
  try {
    userSession = req.session;
    setAuth(req, userSession);
    const { data } = await updateAuthorAPI(req);
    const authors = await getAuthorAPI(req);
    const { result } = authors.data;

    const msg =
      isEmptyObj(result) || result.length < 1
        ? msgs.noAuthorsFound
        : data?.message ?? msgs.authorUpdated;

    return successTemplate(res, "authors", "Authors", userSession, msg, result);
  } catch (err) {
    return errorTemplate(
      req,
      res,
      err,
      "authors",
      "Authors",
      userSession,
      err.response.data.message ?? msgs.noAuthorFound,
    );
  }
};

/**
 * Returns Handler Fn for Delete Author Route
 * @async
 * @param {e.Request} req
 * @param {e.Response} res
 * @param {e.NextFunction} next
 * @returns {e.Response}
 */
export const deleteAuthor = async function (req, res, next) {
  try {
    userSession = req.session;
    setAuth(req, userSession);
    const { data } = await deleteAuthorAPI(req);
    const authors = await getAuthorAPI(req);
    const { result } = authors.data;

    const msg =
      isEmptyObj(result) || result.length < 1
        ? msgs.noAuthorsFound
        : data?.message ?? msgs.authorDeleted;

    return successTemplate(res, "authors", "Authors", userSession, msg, result);
  } catch (err) {
    return errorTemplate(
      req,
      res,
      err,
      "authors",
      "Authors",
      userSession,
      err.response.data.message ?? msgs.noAuthorFound,
    );
  }
};
