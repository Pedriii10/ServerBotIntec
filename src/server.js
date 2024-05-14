const cors = require("cors");
const https = require("https");
const express = require("express");
const socketConnection = require("./io");
const fs = require("fs");

const app = express();
app.use(cors());

const { Server } = require("socket.io");

const options = {
  key: fs.readFileSync('./etc/letsencrypt/live/intecbot.com/privkey.pem'),
  cert: fs.readFileSync('./etc/letsencrypt/live/intecbot.com/src/fullchain.pem')
};

const server = https.createServer(options, app);

const io = new Server(server, {
  cors: {
    origin: process.env.FRONT_URL,
    methods: ["GET", "POST"],
  },
});

app.use(express.json());

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

server.listen(3001, () => console.log("Server started"));