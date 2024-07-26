import e from "express";
import session from "express-session";
import {
  deleteBookAPI,
  getBookAPI,
  getBookById,
  postBookAPI,
  updateBookAPI,
} from "../services/bookService.mjs";
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
 * Returns Handler Fn to access addbook page
 * @async
 * @param {e.Request} req
 * @param {e.Response} res
 * @param {e.NextFunction} next
 * @returns {e.Response}
 */
export const getAddBook = function (req, res, next) {
  userSession = req.session;
  return successTemplate(
    res,
    "addBook",
    "Add a Book",
    userSession,
    msgs.addBook,
    null,
  );
};

/**
 * Returns Handler Fn for Get All Books Route
 * @async
 * @param {e.Request} req
 * @param {e.Response} res
 * @param {e.NextFunction} next
 * @returns {e.Response}
 */
export const getEditBook = async function (req, res, next) {
  try {
    userSession = req.session;
    setAuth(req, userSession);
    const { data } = await getBookById(req);

    return successTemplate(
      res,
      "editBook",
      "Edit Book",
      userSession,
      msgs.editBook,
      data.result,
    );
  } catch (err) {
    let msg = err.response.data.message ?? msgs.editBookPageFail;
    console.error(msg);
    return errorTemplate(req, res, err, "home", "Home", "undefined", msg);
  }
};

/**
 * Returns Handler Fn for Get All Books Route
 * @async
 * @param {e.Request} req
 * @param {e.Response} res
 * @param {e.NextFunction} next
 * @returns {e.Response}
 */
export const getBooks = async function (req, res, next) {
  try {
    userSession = req.session;
    req.headers.authorization = `Bearer ${userSession.token}`;
    const { data } = await getBookAPI(req);
    const msg =
      isEmptyObj(data.result) || data.result.length < 0
        ? msgs.noBooksFound
        : data?.message ?? msgs.booksFound;
    return successTemplate(
      res,
      "books",
      "Books",
      userSession,
      msg,
      data.result,
    );
  } catch (err) {
    return errorTemplate(
      req,
      res,
      err,
      "home",
      "Home",
      err.response.data.message ?? msgs.noBooksFound,
    );
  }
};

/**
 * Returns Handler Fn for post a book Route
 * @async
 * @param {e.Request} req
 * @param {e.Response} res
 * @param {e.NextFunction} next
 * @returns {e.Response}
 */
export const postBook = async function (req, res, next) {
  try {
    userSession = req.session;
    setAuth(req, userSession);
    const { data } = await postBookAPI(req);
    const books = await getBookAPI(req);
    const { result } = books.data;
    const msg =
      result.length < 0 ? msgs.noBooksFound : data?.message ?? msgs.bookAdded;

    return successTemplate(res, "books", "Books", userSession, msg, result);
  } catch (err) {
    let msg = err.response.data.message ?? msgs.noBookAdded;
    console.error(msg);
    return errorTemplate(req, res, err, "home", "Home", "undefined", msg);
  }
};

/**
 * Returns Handler Fn for books/update Route
 * @async
 * @param {e.Request} req
 * @param {e.Response} res
 * @param {e.NextFunction} next
 * @returns {e.Response}
 */
export const updateBook = async function (req, res, next) {
  try {
    userSession = req.session;
    req.headers.authorization = `Bearer: ${userSession.token}`;
    const { data } = await updateBookAPI(req);
    const books = await getBookAPI(req);
    const { result } = books.data;

    const msg =
      isEmptyObj(result) || result.length < 1
        ? msgs.noBooksFound
        : data?.message ?? msgs.bookUpdated;

    return successTemplate(res, "books", "Books", userSession, msg, result);
  } catch (err) {
    console.error(err);
    return errorTemplate(
      req,
      res,
      err,
      "books",
      "Books",
      "undefined",
      err.response.data.message ?? msgs.noBookUpdated,
    );
  }
};

/**
 * Returns Handler Fn to Delete a Book Route
 * @async
 * @param {e.Request} req
 * @param {e.Response} res
 * @param {e.NextFunction} next
 * @returns {e.Response}
 */
export const deleteBook = async function (req, res, next) {
  try {
    userSession = req.session;
    setAuth(req, userSession);
    const { data } = await deleteBookAPI(req);
    const books = await getBookAPI(req);
    const { result } = books.data;
    const msg =
      isEmptyObj(result) || result.length < 1
        ? msgs.noBooksFound
        : data?.message ?? msgs.bookDeleted;

    return successTemplate(res, "books", "Books", userSession, msg, result);
  } catch (err) {
    console.error(err);
    return errorTemplate(
      req,
      res,
      err,
      "books",
      "Books",
      "undefined",
      err.response.data.message ?? msgs.noBookDeleted,
    );
  }
};
