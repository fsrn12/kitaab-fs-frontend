// const strRegEx = /^[A-Za-z]+$/;
const strRegEx = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/;
const addressRegEx = /^[\d{1,5}\s\w.\s(\b\w*\b\s){1,2}\w*\.']+$/;
const postcodeRegEx = /[A-Z]{1,2}[0-9]{1,2}[A-Z]?\s?[0-9][A-Z]{2}/i;
const emailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const passwordRegEx =
  /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&?-@ '"]).*$/;

const regExCheck = (str, RegEx) => RegEx.test(str);
const cleanBody = (obj) => {
  let newObj = {};
  for (let k of Object.keys(obj)) {
    newObj[k] = obj[k].toString().toLowerCase().trim();
  }
  return newObj;
};

export const validateSignupForm = function (body) {
  let newBody = cleanBody(body);

  const {
    firstName,
    lastName,
    address,
    city,
    postcode,
    email,
    password,
    confirmPassword,
  } = newBody;

  let errors = {};

  if (firstName.length < 2 || !regExCheck(firstName, strRegEx)) {
    errors.firstNameMsg = "FIRST NAME IS REQUIRED";
  }

  if (lastName.length < 2 || !regExCheck(lastName, strRegEx)) {
    errors.lastNameMsg = "LAST NAME IS REQUIRED";
  }

  if (address.length < 2 || !regExCheck(address, addressRegEx)) {
    errors.addressMsg = "ADDRESS IS REQUIRED";
  }

  if (address.length < 2 || !regExCheck(city, strRegEx)) {
    errors.cityMsg = "CITY NAME IS REQUIRED";
  }

  if (postcode.length < 2 || !regExCheck(postcode, postcodeRegEx)) {
    errors.postcodeMsg = "POSTCODE IS REQUIRED";
  }

  if (email === "" || !regExCheck(email, emailRegEx)) {
    errors.emailMsg = "Invalid Email Address";
  }

  if (!regExCheck(password, passwordRegEx)) {
    errors.passwordMsg = `Password must have atleast 8 characters, 1 Capital letter, 1 small letter, 1 digit and 1 character from !#$%&?-@'"`;
  }

  if (!regExCheck(confirmPassword, passwordRegEx)) {
    errors.cpasswordMsg = "Confirm the password";
  }

  if (password !== confirmPassword) {
    errors.cpasswordMsg = "Passwords do not match";
  }

  return errors;
};

export const validateLoginForm = function (body) {
  const newBody = cleanBody(body);
  const { email, password } = newBody;
  let errors = {};

  if (email === "" || !regExCheck(email, emailRegEx)) {
    errors.emailMsg = "Invalid Email Address";
  }

  if (!regExCheck(password, passwordRegEx)) {
    errors.passwordMsg = "Invalid Password";
  }
  return errors;
};
