import { NextFunction, Request, Response } from "express";
import "dotenv/config";

export const allowCrossDomain = (req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", process.env.ORIGIN_URL);
  res.header("Access-Control-Allow-Methods", "GET,PATCH,POST,DELETE");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // intercept OPTIONS method
  if ("OPTIONS" === req.method) {
    res.sendStatus(200);
  } else {
    next();
  }
};
