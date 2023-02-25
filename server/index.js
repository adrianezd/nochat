const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const port = 3001;
const { Server } = require("socket.io");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});


io.on("connection", (socket) => {
  console.log(`a user connected, ${socket.id}`);

  socket.on("join", ({ username, room }) => {
    console.log(`${username} joined ${room}`);
    socket.join(room);
  });

  socket.on("new_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("change_chat_mode", (data) => {
    console.log(data.room, data.chatMode, "chat mode");
    socket.in(data.room).emit("update_chat_mode", data.chatMode);
  });

  socket.on("disconnect", () => {
    console.log(`a user disconnected, ${socket.id}`);
  });
});


server.listen(port, () => {
    console.log(`listening on *:${port}`);
});

