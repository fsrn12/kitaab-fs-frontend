import axios from "axios";
import e from "express";

/**
 * @type {string}
 */
const baseUrl = process.env.BACKEND_URL;

const header = (req, method) =>
  (axios.defaults.headers[method]["Authorization"] = req.headers.authorization);

/**Returns Books Promise from Backend
 * @async
 * @param {e.Request} req
 * @returns {Promise}
 */
export const getBookAPI = async function (req) {
  header(req, "get");
  return axios.get(`${baseUrl}books`);
};

export const postBookAPI = async function (req) {
  const payload = {
    title: req.body.title,
    author: req.body.author,
    ISBN: req.body.ISBN,
    publisher: req.body.publisher,
    yearPublished: req.body.yearPublished,
    numberOfPages: req.body.numberOfPages,
    price: +req.body.price,
  };
  return axios.post(`${baseUrl}books`, payload, header(req, "post"));
};

export const getAllBookIds = async function (req) {
  header(req, "get");
  return axios.get(`${baseUrl}books/all`);
};

export const getBookById = async function (req) {
  header(req, "get");
  return axios.get(`${baseUrl}books/${req.params.bookId}`);
};

export const updateBookAPI = async function (req) {
  const payload = {
    title: req.body.title,
    author: req.body.author,
    ISBN: req.body.ISBN,
    publisher: req.body.publisher,
    yearPublished: req.body.yearPublished,
    numberOfPages: req.body.numberOfPages,
    price: +req.body.price,
  };
  header(req, "patch");
  return axios.patch(`${baseUrl}books/${req.body.id}`, payload);
};

export const deleteBookAPI = async function (req) {
  header(req, "delete");
  return axios.delete(`${baseUrl}books/${req.params.bookId}`);
};
