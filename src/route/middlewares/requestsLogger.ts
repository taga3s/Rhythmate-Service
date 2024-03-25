import { NextFunction, Request, Response } from "express";
import { logger } from "../../pkg/logger";

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  logger.info(
    `METHOD: ${req.method} URL: ${req.originalUrl} STATUS: ${res.statusCode} IP: ${req.ip} USER_AGENT: ${req.get(
      "User-Agent",
    )}`,
  );
  next();
};
