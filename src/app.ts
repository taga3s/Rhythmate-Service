import express from "express";
import "dotenv/config";
import { healthRouter, userRouter, questRouter, tagRouter, weeklyReportRouter } from "./route";
import { cookie } from "express-validator";
import cookieParser from "cookie-parser";
import { allowCrossDomain } from "./utils/cors";
import { cronQuestModel } from "./model/quest/quest_model";
import { cronWeeklyReportModel } from "./model/weeklyreport/weekly_report_model";

const app = express();

app.use(cookie());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cors
app.use(allowCrossDomain);

// ルーティング
app.use("/v1/health", healthRouter);
app.use("/v1/users", userRouter);
app.use("/v1/quests", questRouter);
app.use("/v1/tags", tagRouter);
app.use("/v1/weekly-reports", weeklyReportRouter);

cronQuestModel.EveryDay();
cronQuestModel.EverySunday();
cronWeeklyReportModel.EverySunday();

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server is running at localhost:${PORT}`));
