import { NextFunction, Request, Response } from "express";
import { logger } from "../../pkg/logger/logger";

export const appLogger = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    logger.info(`[${req.method}] ${res.statusCode} "${req.originalUrl}" ip:[${req.ip}]`);
    next();
  };
};
