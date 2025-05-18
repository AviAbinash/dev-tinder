const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bycrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 50,
    },

    lastName: {
      type: String,
      // minLength: 4,
      // maxLength: 4,
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      enum: {
        values: ["male", "female", "others"],
        message: `{VALUE} is not valid`,
      },
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Gender data is not valid");
        }
      },
    },
    emailId: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("invalid Email adress");
        }
      },
    },
    password: {
      type: String,
      required: true,
    },
    photoUrl: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/256/149/149071.png",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("invalid Email adress");
        }
      },
    },
    about: {
      type: String,
      default: "this is a default value of a user",
    },
    skills: {
      type: [String],
    },
  },
  { timestamps: true }
);

userSchema.index({ firstName: 1, lastName: 1 });

userSchema.methods.getToken = async function () {
  const isUser = this;
  const token = await jwt.sign({ _id: isUser?._id }, "DEV@TINDER", {
    expiresIn: "7d",
  });
  return token;
};

userSchema.methods.validatePassword = async function (inPutpassword) {
  const user = this;
  const res = await bycrypt.compare(inPutpassword, user.password);
  return res;
};
const User = mongoose.model("User", userSchema);

module.exports = User;
