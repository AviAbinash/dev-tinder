const validator = require("validator");

const validateSignupData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;
  if (!firstName || !lastName || !emailId || !password) {
    throw new Error("data is not valid");
  }
  if (firstName.length < 4 || firstName?.length > 50) {
    throw new Error("Name is not valid");
  }
  if (!emailId || !validator.isEmail(emailId)) {
    throw new Error("email is not valid");
  }
//   if (password || !validator.isStrongPassword(password)) {
//     throw new Error("password is not valid");
//   }
};

module.exports = { validateSignupData };
