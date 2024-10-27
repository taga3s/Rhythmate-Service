import { Router } from "express";
import { prisma } from "../db/db";

const healthRouter = Router();

healthRouter.get("/", async (req, res) => {
  try {
    await prisma.$queryRaw`select 1`;
    res.status(200).json({ status: "ok", message: "Successfully connected to db" });
  } catch (err) {
    res.status(500).json({ status: "error", message: err });
  }
});

export { healthRouter };
