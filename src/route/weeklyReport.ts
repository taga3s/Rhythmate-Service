import { Router } from "express";
import {
  listWeeklyReportController,
  generateWeeklyReportFeedBackController,
} from "../controller/weeklyReport/weekly_report_controller";
import { auth } from "./middlewares/auth";

const weeklyReportRouter = Router();

weeklyReportRouter.get("/", auth, listWeeklyReportController);
weeklyReportRouter.post("/feedback/:weeklyReportId", auth, generateWeeklyReportFeedBackController);

export { weeklyReportRouter };
