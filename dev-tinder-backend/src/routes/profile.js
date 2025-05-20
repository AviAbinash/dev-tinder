const express = require("express");
const validator = require("validator");
const bycrypt = require("bcrypt");
const { userAuth } = require("../middleware/auth");
const { validateUserEdit } = require("../utils/validation");
const User = require("../models/user");

const profileRouter = express.Router();

profileRouter.get("/getUser/view", userAuth, async (req, res) => {
  try {
    // console.log(req.user,"user>>")
    // const { token } = req.cookies;
    // if (!token) {
    //   throw new Error("Invalid token");
    // }

    // const decodeData = await jwt.verify(token, "DEV@TINDER");
    // const { _id } = decodeData;
    // const user = await User.findById(_id);
    if (!req.user) {
      throw new Error("user doesnot exist");
    }
    res.status(201).json({ message: req.user });
  } catch (error) {
    res.status(400).send(`Error: ${error}`);
  }
});

profileRouter.patch("/getUser/update", userAuth, async (req, res) => {
  try {
    if (!validateUserEdit(req)) {
      // return res.status(404).send({ message: "Invalid Edit request" });
      throw new Error("Invalid Edit request");
    }

    const loggedInUser = req.user;
    Object.keys(req.body).forEach(
      (field) => (loggedInUser[field] = req.body[field])
    );
    const isUpdate = await User.findByIdAndUpdate(
      loggedInUser?._id,
      loggedInUser
    );

    res.status(200).json({
      message: "profile data updated successfully",
      data: isUpdate,
    });
  } catch (error) {
    res.status(404).send(`Error: ${error}`);
  }
});

profileRouter.patch("/getUser/forgotPassword", userAuth, async (req, res) => {
  try {
    const { newPassword } = req.body;
    if (!newPassword) {
      res.status(400).json({ message: "invalid new password" });
    }
    const isStrong = validator.isStrongPassword(newPassword);
    if (isStrong) {
      const hashedPassword = await bycrypt.hash(newPassword, 10);
      const isPasswordUpdate = await User.findByIdAndUpdate(req.user._id, {
        password: hashedPassword,
      });

      res.status(200).json({ message: "password changed successfully" });
    }
  } catch (error) {
    res.status(400).send(`Error: ${error}`);
  }
});

module.exports = profileRouter;
