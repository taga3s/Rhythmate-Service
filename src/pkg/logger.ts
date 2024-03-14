import winston from "winston";

const { colorize, timestamp, combine, simple } = winston.format;

const logger = winston.createLogger({
  level: "info",
  format: combine(
    timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    colorize(),
  ),
  defaultMeta: { service: "rhythmate-service" },
  transports: [
    new winston.transports.Console({
      format: simple(),
    }),
  ],
});

export { logger };
