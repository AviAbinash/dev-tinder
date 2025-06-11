const express = require("express");
const bycrypt = require("bcrypt");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const connectDB = require("./config/database");
const { validateSignupData } = require("./utils/validation");
const { userAuth } = require("./middleware/auth");
const User = require("./models/user");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const connectionRequestRouter = require("./routes/request");
const userRouter = require("./routes/user");

require('dotenv').config()

const app = express();
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200 
}));
app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", connectionRequestRouter);
app.use("/", userRouter);

connectDB()
  .then((res) => {
    console.log("database connected sucessfully");
    app.listen(process.env.PORT, () => {
      console.log(`server started at 8000`);
    });
  })

  .catch((error) => {
    console.log("Error connecting to the database:", error);
  });
