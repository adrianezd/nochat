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

    socket.on("disconnect", () => {
        console.log(`a user disconnected, ${socket.id}`);
    });
});


server.listen(port, () => {
    console.log(`listening on *:${port}`);
}
);

app.get("/", (req, res) => {
    
});