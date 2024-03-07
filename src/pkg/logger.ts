import winston from "winston";

const { colorize, timestamp, errors } = winston.format;

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    errors({ stack: true }),
    colorize(),
  ),
  defaultMeta: { service: "rhythmate-service" },
  transports: [
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
    new winston.transports.File({ filename: "./log/error.log", level: "error" }),
  ],
});

export { logger };
