import express from "express";
import "dotenv/config";
import { healthRouter, userRouter, questRouter, tagRouter, weeklyReportRouter } from "./route";
import { cookie } from "express-validator";
import cookieParser from "cookie-parser";
import { allowCrossDomain } from "./core/cors";
import { cronWeeklyReportModel } from "./model/weeklyReport/weekly_report_model";
import { formatDateTime, now } from "./pkg/dayjs";
import { cronQuestModel } from "./model/quest/cron_quest_model";

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

cronQuestModel.EveryDay(); // 1日ごとのクエストの状態のリセット
cronQuestModel.EverySunday(); // 1週間ごとのクエストの週間達成数のリセット
cronWeeklyReportModel.EverySunday(); // 1週間ごとの新規週報の作成

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`${[formatDateTime(now())]} Server is running at localhost:${PORT}`));
