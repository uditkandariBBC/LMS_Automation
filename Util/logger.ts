import { createLogger, format, transports } from "winston";
import * as path from "path";
import * as fs from "fs";
import "winston-daily-rotate-file";

// Ensure the base logs directory exists
const baseLogDir = "logs";
if (!fs.existsSync(baseLogDir)) {
  fs.mkdirSync(baseLogDir);
}

// Create a new folder for each day
const currentDate = new Date().toISOString().split("T")[0]; // Get current date in YYYY-MM-DD format
const dailyLogDir = path.join(baseLogDir, currentDate);
if (!fs.existsSync(dailyLogDir)) {
  fs.mkdirSync(dailyLogDir);
}

// Create the logger with multiple levels and log rotation
const logger = createLogger({
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    verbose: 4,
    debug: 5,
    silly: 6,
  },
  format: format.combine(
    format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
  ),
  transports: [
    new transports.Console({
      level: "info", // Console logs only 'info' and above (info, warn, error)
      format: format.combine(
        format.colorize(),
        format.printf(
          (info) => `${info.timestamp} ${info.level}: ${info.message}`
        )
      ),
    }),
    new transports.DailyRotateFile({
      filename: path.join(dailyLogDir, "error-%DATE%.log"),
      datePattern: "YYYY-MM-DD",
      level: "error", // File logs only 'error' level messages
      maxFiles: "14d", // Keep logs for 14 days
    }),
    new transports.DailyRotateFile({
      filename: path.join(dailyLogDir, "info-%DATE%.log"),
      datePattern: "YYYY-MM-DD",
      level: "info", // File logs 'info' and above
      maxFiles: "14d", // Keep logs for 14 days
    }),
    new transports.DailyRotateFile({
      filename: path.join(dailyLogDir, "debug-%DATE%.log"),
      datePattern: "YYYY-MM-DD",
      level: "debug", // File logs 'debug' and above
      maxFiles: "14d", // Keep logs for 14 days
    }),
  ],
});

export default logger;
