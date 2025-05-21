const express = require("express");
const bycrypt = require("bcrypt");
const { validateSignupData } = require("../utils/validation");
const User = require("../models/user");
const validator = require("validator");
const authRouter = express.Router();

authRouter.post("/register", async (req, res) => {
  try {
    validateSignupData(req);
    const { firstName, lastName, emailId, password } = req.body;
    const hashedPassword = await bycrypt.hash(password, 10);
    const user = await new User({
      firstName,
      lastName,
      emailId,
      password: hashedPassword,
    });
    await user.save();
    res.status(201).send({ message: "user Register sucessfully " });
  } catch (error) {
    res.status(400).send(`Error: ${error}`);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    if (!validator.isEmail(emailId)) {
      throw new Error("email is not valid");
    }

    const isUser = await User.findOne({ emailId });
    if (!isUser) {
      throw new Error("Invalid credentials");
    }
    const isPasswordMatch = await isUser.validatePassword(password);
    if (!isPasswordMatch) {
      throw new Error("Invalid credentials");
    }
    const token = await isUser.getToken();
    const userdata = {
      firstName:isUser?.firstName,
      lastName:isUser?.lastName,
      email:isUser?.emailId,

    }
    res
      .cookie("token", token, { expires: new Date(Date.now() + 8 * 3600000) }) //expires in 8hours
      .status(201)
      .send({ message: "log in  successfully ", user: userdata });
  } catch (error) {
    res.status(400).send(`Error: ${error}`);
  }
});

authRouter.post("/logout", (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", null, { expires: new Date(Date.now()) })
      .send({ message: "logout successfull" });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = authRouter;
