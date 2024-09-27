import { createLogger, format, transports } from "winston";
import * as path from "path";
import * as fs from "fs";

// Ensure the logs directory exists
const logDir = "logs";
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

// Create different transport files for different log levels
const infoLog = path.join(logDir, "info.log");
const errorLog = path.join(logDir, "error.log");
const debugLog = path.join(logDir, "debug.log");

// Create the logger with multiple levels
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
    new transports.File({
      filename: errorLog,
      level: "error", // File logs only 'error' level messages
    }),
    new transports.File({
      filename: infoLog,
      level: "info", // File logs 'info' and above
    }),
    new transports.File({
      filename: debugLog,
      level: "debug", // File logs 'debug' and above
    }),
  ],
});

export default logger;
