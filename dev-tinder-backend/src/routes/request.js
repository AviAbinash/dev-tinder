const express = require("express");
const { userAuth } = require("../middleware/auth");

const connectionRequestRouter = express.Router();
const connectionRequestModel = require("../models/connectionRequest");
const User = require("../models/user");

connectionRequestRouter.post(
  "/request/send/:connectionStatus/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.connectionStatus;
      if (!fromUserId || !toUserId || !status) {
        return res.status(400).send({ message: "invlid data" });
      }
      //   if()
      const allowedStatus = ["intrested", "ignored"];
      const isAllowed = allowedStatus.includes(status);
      if (!isAllowed) {
        return res
          .status(400)
          .json({ message: `invalid status type ${status}` });
      }

      const isUserExist = await User.findById({ _id: toUserId });

      if (!isUserExist) {
        return res.status(404).json({ message: "user not found" });
      }
      const isConnectionPresent = await connectionRequestModel.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });
      if (isConnectionPresent) {
        return res
          .status(400)
          .json({ message: "connection request already exist" });
      }

      const connectionrequest = new connectionRequestModel({
        fromUserId,
        toUserId,
        status,
      });
      const data = await connectionrequest.save();
      if (status == "intrested") {
        res.status(201).json({ message: "connection request sent", data });
      } else {
        res.status(201).json({ message: "connection request ignored", data });
      }
    } catch (error) {
      res.status(400).json(`error - ${error}`);
    }
  }
);

connectionRequestRouter.post(
  "/request/review/:connectionStatus/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const loggedInUser = req.user;
      const { connectionStatus, requestId } = req.params;
      const allowedStatus = ["accepted", "rejected"];
      const isAllowed = allowedStatus.includes(connectionStatus);
      if (!isAllowed) {
        return res.status(400).json({ message: "request status mot allowed" });
      }
      const connectionrequest = await connectionRequestModel.findOne({
        fromUserId: requestId,
        toUserId: loggedInUser._id,
        status: "intrested",
      });
      if (!connectionrequest) {
        return res
          .status(404)
          .json({ message: "connection request not found" });
      }

      connectionrequest.status = connectionStatus;
      const data = await connectionrequest.save();
      res
        .status(200)
        .json({ message: `connection request ${connectionStatus}`, data });
    } catch (error) {
      res.status(400).json(`error - ${error}`);
    }
  }
);

module.exports = connectionRequestRouter;
