import { Router } from "express";
import {
  listWeeklyReportController,
  summarizeWeeklyReportController,
} from "../controller/weeklyReport/weekly_report_controller";
import { auth } from "./middlewares/auth";

const weeklyReportRouter = Router();

weeklyReportRouter.get("/", auth, listWeeklyReportController);
weeklyReportRouter.get("/summarize", auth, summarizeWeeklyReportController);

export { weeklyReportRouter };
