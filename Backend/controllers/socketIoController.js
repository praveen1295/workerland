const socketIO = require("socket.io");

let io;

const initSocketIO = (server) => {
  io = socketIO(server);

  io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });

    // Add more Socket.IO event handling here...
  });

  return io;
};

module.exports = { initSocketIO };
