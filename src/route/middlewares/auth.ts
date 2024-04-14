import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../../core/jwt";

export const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.access_token;
    const decoded = verifyToken(token);
    next();
  } catch (err) {
    res.status(403).json({ status: "error", message: "ユーザーが認証されていません。" });
  }
};
