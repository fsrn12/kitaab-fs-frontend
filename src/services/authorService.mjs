import axios from "axios";

const baseUrl = process.env.BACKEND_URL;

const header = (req, method) =>
  (axios.defaults.headers[method]["Authorization"] = req.headers.authorization);

export const getAuthorAPI = async function (req) {
  header(req, "get");
  return axios.get(`${baseUrl}authors`);
};

export const getAuthorById = async function (req) {
  header(req, "get");
  return axios.get(`${baseUrl}authors/${req.params.authorId}`);
};

export const postAuthorAPI = async function (req) {
  const payload = {
    name: req.body.name,
    book: [req.body.bookId],
    publisher: req.body.publisher,
    website: req.body.website,
    twitter: req.body.twitter,
    about: req.body.about,
  };
  //console.log(payload);
  return axios.post(`${baseUrl}authors`, payload, header(req, "post"));
};

export const updateAuthorAPI = async function (req) {
  const payload = {
    name: req.body.name,
    publisher: req.body.publisher,
    website: req.body.website,
    twitter: req.body.twitter,
    about: req.body.about,
  };
  header(req, "patch");
  return axios.patch(`${baseUrl}authors/${req.body.id}`, payload);
};

export const deleteAuthorAPI = async function (req) {
  header(req, "delete");
  return axios.delete(`${baseUrl}authors/${req.params.authorId}`);
};
