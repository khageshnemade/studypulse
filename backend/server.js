const express = require("express");
const app = express();
const PORT = 4000;
const http = require("http").Server(app);
const cors = require("cors");

app.use(cors());

const socketIO = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
});

let users = {}; // Store connected users

socketIO.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} connected`);

  // Add user when they join
  socket.on("addUser", (userName) => {
    users[socket.id] = userName;
    socketIO.emit("users", Object.values(users)); // Send updated user list
  });

  // Handle incoming messages
  socket.on("message", (data) => {
    socketIO.emit("messageResponse", data);
  });

  // Remove user when they disconnect
  socket.on("disconnect", () => {
    console.log(`🔥: ${users[socket.id]} disconnected`);
    delete users[socket.id];
    socketIO.emit("users", Object.values(users)); // Update user list
  });
});

http.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
