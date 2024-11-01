import "dotenv/config";
import express from "express";
import { healthRouter, userRouter, questRouter, tagRouter, weeklyReportRouter, badgeRouter } from "./route";
import { cookie } from "express-validator";
import cookieParser from "cookie-parser";
import { logger } from "./pkg/logger/logger";
import { appLogger } from "./route/middlewares/appLogger";
import { badgeCronJob, weeklyReportCronJob, questCronJob } from "./cron-job";
import helmet from "helmet";
import cors from "cors";

const app = express();

app.use(cookie());
app.use(cookieParser());
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));

// security
app.use(helmet());
// logging
app.use(appLogger());
// cors
app.use(
  cors({
    origin: process.env.ORIGIN_URL,
    credentials: true,
  }),
);
// routing
app.use("/v1/users", userRouter);
app.use("/v1/quests", questRouter);
app.use("/v1/tags", tagRouter);
app.use("/v1/weekly-reports", weeklyReportRouter);
app.use("/v1/badge", badgeRouter);
if (process.env.NODE_ENV === "dev") {
  app.use("/v1/health", healthRouter);
}

// TODO: move cron-jobs to another service
questCronJob.updateEveryDay();
questCronJob.updateEverySunday();
weeklyReportCronJob.updateEveryDay();
weeklyReportCronJob.createEverySunday();
badgeCronJob.upsertEverySunday();

const PORT = process.env.PORT;
app.listen(PORT, () => logger.info(`Server is running at http://localhost:${PORT}`));
