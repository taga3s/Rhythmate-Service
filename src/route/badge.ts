import { Router } from "express";
import {
  achieveBadgeController,
  listBadgeController,
  pinBadgeController,
  unpinBadgeController,
} from "../controller/badge/badge_controller";
import { auth } from "./middlewares/auth";

const badgeRouter = Router();

badgeRouter.post("/", auth, achieveBadgeController);
badgeRouter.get("/", auth, listBadgeController);
badgeRouter.patch("/pin/:id", auth, pinBadgeController);
badgeRouter.patch("/unpin/:id", auth, unpinBadgeController);
export { badgeRouter };
