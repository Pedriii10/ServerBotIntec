const winston = require("winston");
const fs = require("fs");
const path = require("path");

const logsDir = path.join(__dirname, "../logs");

if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

const logConfiguration = {
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: path.join(logsDir, "socket-activity.log"),
    }),
  ],
  format: winston.format.combine(
    winston.format.timestamp({
      format: "MMM-DD-YYYY HH:mm:ss",
    }),
    winston.format.printf(
      (info) => `${info.level}: ${info.timestamp}: ${info.message}`
    )
  ),
};

const logger = winston.createLogger(logConfiguration);

module.exports = logger;
