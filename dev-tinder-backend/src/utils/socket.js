const socket = require("socket.io");

const initializeSocket = (server) => {
  const io = socket(server, {
    cors: {
      origin: "http://localhost:3000",
    },
  });

  io.on("connection", (socket) => {
    socket.on("joinchat", ({userId,targetId}) => {
      const roomId =[userId,targetId].sort().join("_")
      console.log("roomeid created",roomId)
      socket.join(roomId)
    });
      socket.on("sendMessage", ({userId,targetId,text}) => {
      const roomId =[userId,targetId].sort().join("_")
      console.log("roomeid created",roomId)
      console.log("text",text)

      io.to(roomId).emit("newMessage",{text})
    });
  });
};

module.exports = initializeSocket;
