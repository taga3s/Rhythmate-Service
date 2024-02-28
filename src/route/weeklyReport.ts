import { Router } from "express";
import { listWeeklyReportController } from "../controller/weeklyReport/weekly_report_controller";
import { auth } from "./middlewares/auth";

const weeklyReportRouter = Router();

weeklyReportRouter.get("/", auth, listWeeklyReportController);

export { weeklyReportRouter };
