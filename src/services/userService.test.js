import { expect, test, vi } from "vitest";
import { login, signup } from "./userService.mjs";

let n = Math.floor(Math.random() * 100);
const postBody = {
  firstName: "Alex",
  lastName: "Ferguson",
  email: `alex${n}@gmail.com`,
  password: "Alex@1234",
  confirmPassword: "Alex@1234",
  address: "123 Merton Road",
  city: "LONDON",
  postcode: "SW20 4BY",
};
const loginBody = {
  email: "alex@gmail.com",
  password: "Alex@1234",
};
vi.mock("./userService.mjs");
test("POST Signup Should Return a User", async () => {
  const user = await signup(postBody);
  // console.log(user.data);

  expect(user.data.message).toEqual("Successful Registration");
  expect(user.data.user.firstName).toEqual("Alex");
  expect(user.data.user.lastName).toEqual("Ferguson");
  expect(user.data.user.address).toEqual("123 Merton Road");
  expect(user.data.user.city).toEqual("LONDON");
  expect(user.data.user.postcode).toEqual("SW20 4BY");
  // expect(user.data.user.email).toEqual("alex@gmail.com");
});

test("POST Login Should Return a User", async () => {
  const user = await login(loginBody);
  // console.log(user.data);

  expect(user.data.message).toEqual("Login Success");
  expect(user.data.user.firstName).toEqual("Alex");
  expect(user.data.user.lastName).toEqual("Ferguson");
  expect(user.data.user.address).toEqual("123 Merton Road");
  expect(user.data.user.city).toEqual("LONDON");
  expect(user.data.user.postcode).toEqual("SW20 4BY");
  // expect(user.data.user.email).toEqual("alex@gmail.com");
  expect(user.data.logged).toBe(true);
});
