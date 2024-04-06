import express from "express";
import "dotenv/config";
import { healthRouter, userRouter, questRouter, tagRouter, weeklyReportRouter, badgeRouter } from "./route";
import { cookie } from "express-validator";
import cookieParser from "cookie-parser";
import { allowCrossDomain } from "./core/cors";
import { logger } from "./pkg/logger";
import { cronQuestModel } from "./cron-job/quest";
import { cronWeeklyReportModel } from "./cron-job/weeklyReport";
import { requestsLogger } from "./route/middlewares/requestsLogger";
import { badgeCronJob } from "./cron-job/badge";

const app = express();

app.use(cookie());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logger
app.use(requestsLogger);

// cors
app.use(allowCrossDomain);

// ルーティング
app.use("/v1/users", userRouter);
app.use("/v1/quests", questRouter);
app.use("/v1/tags", tagRouter);
app.use("/v1/weekly-reports", weeklyReportRouter);
app.use("/v1/badge", badgeRouter);
// 開発環境のみ
if (process.env.NODE_ENV === "dev") {
  app.use("/v1/health", healthRouter);
}

// cronジョブ
cronQuestModel.updateEveryDay(); // 1日ごとのクエストの状態のリセット
cronQuestModel.updateEverySunday(); // 1週間ごとのクエストの週間達成数のリセット
cronWeeklyReportModel.createEverySunday(); // 1週間ごとの新規週報の作成
badgeCronJob.upsertEverySunday();

const PORT = process.env.PORT;

app.listen(PORT, () => logger.info(`Server is running at http://localhost:${PORT}`));
