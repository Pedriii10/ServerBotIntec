const logger = require("./logger");

const socketConnection = (io) => {
  io.on("connection", (socket) => {
    const clientIp = socket.handshake.address || "IP desconocida";

    logger.info(`User connected, ID: ${socket.id}, IP: ${clientIp}`);

    socket.on("event-message", (message) => {
      logger.info(`Mensaje recibido de ${clientIp}: ${message}`);
      io.emit("event-message", message);
    });

    socket.on("disconnect", () => {
      logger.info(`User disconnected, ID: ${socket.id}, IP: ${clientIp}`);
    });
  });

  process.on("uncaughtException", (err) => {
    logger.error(`Uncaught Exception: ${err}`);
  });

  process.on("unhandledRejection", (reason, promise) => {
    logger.error(`Unhandled Rejection at: ${promise}, reason: ${reason}`);
  });
};

module.exports = socketConnection;
