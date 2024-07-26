export const signup = async function (body) {
  console.log("Mocked SignUp");
  return Promise.resolve({
    data: {
      message: "Successful Registration",
      user: {
        firstName: "Alex",
        lastName: "Ferguson",
        address: "123 Merton Road",
        city: "LONDON",
        postcode: "SW20 4BY",
      },
    },
  });
};

export const login = async function (body) {
  console.log("Mocked Login");
  return Promise.resolve({
    data: {
      message: "Login Success",
      user: {
        firstName: "Alex",
        lastName: "Ferguson",
        address: "123 Merton Road",
        city: "LONDON",
        postcode: "SW20 4BY",
      },
      logged: true,
    },
  });
};
