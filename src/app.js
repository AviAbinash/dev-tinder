const express = require("express");
const bycrypt = require("bcrypt");

const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const connectDB = require("./config/database");
const { validateSignupData } = require("./utils/validation");
const { userAuth } = require("./middleware/auth");
const User = require("./models/user");
const authRouter = require("./routes/auth")
const profileRouter = require("./routes/profile")
const connectionRequestRouter = require("./routes/request")

const app = express();
app.use(express.json());
app.use(cookieParser());


app.use("/",authRouter)
app.use("/",profileRouter)
app.use("/",connectionRequestRouter)

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
