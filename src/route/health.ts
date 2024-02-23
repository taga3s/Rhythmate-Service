import { Router } from "express";

const healthRouter = Router();

healthRouter.get("/", (req, res) => res.json({ health: "ok" }));

export { healthRouter };
