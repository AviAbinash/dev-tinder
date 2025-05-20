const express = require("express");
const { userAuth } = require("../middleware/auth");
const connectionRequestModel = require("../models/connectionRequest");

const userRouter = express();

// get all the pending connection request for the loggedin user

userRouter.get("/user/request/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const requests = await connectionRequestModel
      .find({
        toUserId: loggedInUser?._id,
        status: "intrested",
      })
      .populate("fromUserId", [
        "firstName",
        "lastName",
        "photoUrl",
        "age",
        "about",
        "gender",
        "skills",
      ]);
    if (requests.length <= 0) {
      return res.status(200).json({ message: "no request found" });
    }
    res
      .status(200)
      .json({ message: "pending request sent successfully", requests });
  } catch (error) {
    res.status(400).send(`Error: ${error}`);
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connections = await connectionRequestModel
      .find({
        $or: [
          { fromUserId: loggedInUser?._id, status: "accepted" },
          { toUserId: loggedInUser?._id, status: "accepted" },
        ],
      })
      .populate("fromUserId", [
        "firstName",
        "lastName",
        "photoUrl",
        "age",
        "about",
        "gender",
        "skills",
      ])
      .populate("toUserId", [
        "firstName",
        "lastName",
        "photoUrl",
        "age",
        "about",
        "gender",
        "skills",
      ]);
    if (connections.length <= 0) {
      return res.status(404).send({ message: "no connections found" });
    }
    const data = connections?.map((ele) => {
      if (ele.fromUserId?._id.toString() === loggedInUser?._id.toString()) {
        return ele.toUserId;
      }
      return ele.fromUserId;
    });
    res.status(200).json({ data });
  } catch (error) {
    res.status(400).send(`Error: ${error}`);
  }
});

module.exports = userRouter;
