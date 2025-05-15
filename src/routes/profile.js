const express = require("express");
const { userAuth } = require("../middleware/auth");

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
    res.status(201).send({ message: req.user });
  } catch (error) {
    res.status(400).send(`Error: ${error}`);
  }
});

profileRouter.patch("/getUser/update", userAuth, async (req, res) => {

});

module.exports = profileRouter;
