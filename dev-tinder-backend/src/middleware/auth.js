const jwt = require("jsonwebtoken");
const User = require("../models/user");
const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new Error("token is not valid");
    }
    const decodeObj = await jwt.verify(token, process.env.JWT_SECRET);
    const { _id } = decodeObj;

    const user = await User.findById(_id);

    if (!user) {
      throw new Error("user not found");
    }

    req.user = user;

    next();
  } catch (error) {
    res.status(401).send(`Error: ${error}`);
  }
};

module.exports = { userAuth };
