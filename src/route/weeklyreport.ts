import { Router } from "express";
import {
  getWeeklyReportController,
} from "../controller/weeklyreport/weeklyreport_controller";
import { body } from "express-validator";
import { validate } from "../pkg/validate";
import { auth } from "./middlewares/auth";

const weeklyReportRouter = Router();

weeklyReportRouter.get(
  "/", 
  auth,
  getWeeklyReportController
);

export { weeklyReportRouter };