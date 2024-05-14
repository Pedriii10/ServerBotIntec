const logger = require("./logger");

const socketConnection = (io) => {
  io.on("connection", (socket) => {
    const clientIp = socket.handshake.address || "IP desconocida";

    logger.info(`User connected, ID: ${socket.id}, IP: ${clientIp}`);

    socket.on("event-message", (message) => {
      logger.info(`Mensaje recibido de ${clientIp}: ${message}`);
      io.emit("event-message", message);
    });

    socket.on("object-event", (data) => {
      const { event, message } = data;
      logger.info(`Mensaje recibido de ${clientIp}: Evento: ${event}, Mensaje: ${message}`);
      io.emit("object-event", { event, message });
    });
  
    socket.on("event-danger", (message) => {
      logger.info(`Mensaje recibido de ${clientIp}: ${message}`);
      io.emit("event-danger", message);
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
