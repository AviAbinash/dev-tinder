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

//optimaizing query in connectionRequestSchema
connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 });

connectionRequestSchema.pre("save", function (next) {
  const connectionRequest = this;
  //check the fromUserId and toUserId are same or not

  if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
    throw new Error("Cannot send connection request to youself");
  }
  next();
});

const connectionRequestModel = new mongoose.model(
  "connectionRequest",
  connectionRequestSchema
);

module.exports = connectionRequestModel;
