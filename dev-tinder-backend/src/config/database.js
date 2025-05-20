const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect("mongodb+srv://abinashtripathymongo:abinashtripathymongo@cluster0.xdkpcgp.mongodb.net/dev-tinder");
};



module.exports= connectDB