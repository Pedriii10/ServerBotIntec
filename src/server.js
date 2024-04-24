const cors = require("cors");
const http = require("http");
const express = require("express");
const socketConnection = require("./io");
const app = express();
app.use(cors());

const { Server } = require("socket.io");

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.FRONT_URL,
    methods: ["GET", "POST"],
  },
});

app.use(express.json());

socketConnection(io);

server.listen(3001, () => console.log("Server started"));
