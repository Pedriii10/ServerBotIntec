require("dotenv").config();
const cors = require("cors");
const https = require("https");
const express = require("express");
const socketConnection = require("./config/io");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());

const { Server } = require("socket.io");

const isProduction = process.env.NODE_ENV === "production";

let options;
if (isProduction) {
  const certPath = process.env.CERT_PATH || path.resolve(__dirname, "certs");
  options = {
    key: fs.readFileSync(path.join(certPath, "privkey.pem")),
    cert: fs.readFileSync(path.join(certPath, "fullchain.pem")),
  };
} else {
  options = {
    key: fs.readFileSync(
      path.resolve(__dirname, "../certs/localhost+2-key.pem")
    ),
    cert: fs.readFileSync(path.resolve(__dirname, "../certs/localhost+2.pem")),
  };
}

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

const port = process.env.PORT || 3001;
server.listen(port, () => console.log(`Server started on port ${port}`));
