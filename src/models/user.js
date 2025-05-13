const mongoose = require("mongoose");
const validator = require("validator");

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

const User = mongoose.model("User", userSchema);

module.exports = User;
