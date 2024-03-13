import { Router } from "express";
import {
  listWeeklyReportController,
  getWeeklyReportSummaryController,
} from "../controller/weeklyReport/weekly_report_controller";
import { auth } from "./middlewares/auth";

const weeklyReportRouter = Router();

weeklyReportRouter.get("/", auth, listWeeklyReportController);
weeklyReportRouter.get("/summarize", auth, getWeeklyReportSummaryController);

export { weeklyReportRouter };
