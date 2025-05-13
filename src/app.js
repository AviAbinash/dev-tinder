const express = require("express");
const bycrypt = require("bcrypt");
const validator = require("validator");
const connectDB = require("./config/database");
const { validateSignupData } = require("./utils/validation");
const User = require("./models/user");

const app = express();
app.use(express.json());

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
    console.log(isPasswordMatch);
    if (!isPasswordMatch) {
      throw new Error("Invalid credentials");
    }
    res.status(201).send({ message: "log in  successfully " });
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
