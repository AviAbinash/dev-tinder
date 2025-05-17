const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      reduired: true,

    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      reduired: true,
    },
    status: {
      type: String,
      enum: {
        values: ["ignored", "intrested", "accepeted", "rejected"],
      },
      message: `{VALUE} is not valid`,
      reduired: true,
    },
  },
  { timestamps: true }
);

const connectionRequestModel = new mongoose.model(
  "connectionRequest",
  connectionRequestSchema
);

module.exports = connectionRequestModel
