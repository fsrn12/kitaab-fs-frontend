import e from "express";
import session from "express-session";

/**
 * Returns an Express Response Template
 * @param {e.Request} req
 * @param {e.Response} res
 * @param {string} page
 * @param {string} title
 * @param {session} session
 * @param {string} message
 * @param {Array} data
 * @returns {e.Response} res
 */
export const successTemplate = function (
  res,
  page,
  title,
  session,
  message = "",
  data = [],
) {
  return res.render(page, {
    title,
    message,
    session,
    data,
  });
};

/**
 * Returns an Express Error Response Template
 * @param {e.Request} req
 * @param {e.Response} res
 * @param {number} status
 * @param {Error} err
 * @param {string} page
 * @param {string} title
 * @param {string} message
 * @param {session} session
 * @returns {e.Response} res
 */
export const errorTemplate = function (
  req,
  res,
  err,
  page,
  title,
  session = "undefined",
  msg = "",
) {
  return res.render(page, {
    title,
    body: req.body,
    errors: err,
    session,
    message: msg ? msg : err?.message,
  });
};
