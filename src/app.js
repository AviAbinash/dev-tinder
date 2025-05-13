const express = require("express");
const bycrypt = require("bcrypt");
const validator = require("validator");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const connectDB = require("./config/database");
const { validateSignupData } = require("./utils/validation");
const { uerAuth } = require("./middleware/auth");
const User = require("./models/user");

const app = express();
app.use(express.json());
app.use(cookieParser());

app.post("/register", async (req, res) => {
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

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    if (!validator.isEmail(emailId)) {
      throw new Error("email is not valid");
    }

    const isUser = await User.findOne({ emailId });
    if (!isUser) {
      throw new Error("Invalid credentials");
    }
    const isPasswordMatch = await bycrypt.compare(password, isUser.password);
    if (!isPasswordMatch) {
      throw new Error("Invalid credentials");
    }
    const token = jwt.sign({ _id: isUser?._id }, "DEV@TINDER");
    res
      .cookie("token", token)
      .status(201)
      .send({ message: "log in  successfully " });
  } catch (error) {
    res.status(400).send(`Error: ${error}`);
  }
});

app.get("/getUser", uerAuth, async (req, res) => {
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

connectDB()
  .then((res) => {
    console.log("database connected sucessfully");
    app.listen(3000, () => {
      console.log("server started");
    });
  })

  .catch((error) => {
    console.log("Error connecting to the database:", error);
  });
