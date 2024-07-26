import axios from "axios";

const baseUrl = process.env.BACKEND_URL;

export const signup = async function (body) {
  const res = await axios.post(`${baseUrl}users/signup`, {
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    password: body.password,
    confirmPassword: body.confirmPassword,
    address: body.address,
    city: body.city,
    postcode: body.postcode,
  });

  return res;
};

export const login = async function (body) {
  const res = await axios.post(`${baseUrl}users/login`, {
    email: body.email,
    password: body.password,
  });
  return res;
};
