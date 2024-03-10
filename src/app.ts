import cookieParser from "cookie-parser";
import "dotenv/config";
import express from "express";
import { cookie } from "express-validator";
import { allowCrossDomain } from "./core/cors";
import { cronQuestModel } from "./model/quest/cron_quest_model";
import { cronWeeklyReportModel } from "./model/weeklyReport/cron_weekly_report.model";
import { logger } from "./pkg/logger";
import { healthRouter, questRouter, tagRouter, userRouter, weeklyReportRouter } from "./route";

const app = express();

app.use(cookie());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cors
app.use(allowCrossDomain);

// ルーティング
app.use("/v1/users", userRouter);
app.use("/v1/quests", questRouter);
app.use("/v1/tags", tagRouter);
app.use("/v1/weekly-reports", weeklyReportRouter);
// 開発環境のみ
if (process.env.NODE_ENV === "dev") {
  app.use("/v1/health", healthRouter);
}

// cronジョブ
cronQuestModel.updateEveryDay(); // 1日ごとのクエストの状態のリセット
cronQuestModel.updateEverySunday(); // 1週間ごとのクエストの週間達成数のリセット
cronWeeklyReportModel.createEverySunday(); // 1週間ごとの新規週報の作成

const PORT = process.env.PORT;

// app.listen(PORT, () =>
//   logger.info(`Server is running at http://localhost:${PORT}`)
// );

app.listen(PORT, (err): void => {
  if (err) {
    logger.error(`Server is something wrong, please try again`);
  } else {
    logger.info(`Server is running at http://localhost:${PORT}`);
  }
});
