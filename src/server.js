require("dotenv").config();
const cors = require("cors");
const express = require("express");
const socketConnection = require("./config/io");

const app = express();
app.use(cors());
app.use(express.json());

const { Server } = require("socket.io");
const http = require("http");

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.FRONT_URL,
    methods: ["GET", "POST"],
  },
});

app.use((req, res, next) => {
  console.log(`Request received: ${req.method} ${req.url}`);
  next();
});

app.get("/health", (req, res) => {
  res.status(200).send("OK!");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Algo va mal");
});

socketConnection(io);

const port = process.env.PORT || 3001;
server.listen(port, '0.0.0.0', () => {
  console.log(`Server started on port ${port}`);
});

