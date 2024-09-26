import { createLogger, format, transports } from "winston";
import * as path from "path";
import * as fs from "fs";

const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
  ),
  transports: [],
});

export default logger;
