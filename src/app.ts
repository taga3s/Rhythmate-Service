import "dotenv/config";
import express from "express";
import { healthRouter, userRouter, questRouter, tagRouter, weeklyReportRouter, badgeRouter } from "./route";
import { cookie } from "express-validator";
import cookieParser from "cookie-parser";
import { allowCrossDomain } from "./core/cors";
import { logger } from "./pkg/logger";
import { requestsLogger } from "./route/middlewares/requestsLogger";
import { badgeCronJob, weeklyReportCronJob, questCronJob } from "./cron-job";
import helmet from "helmet";

const app = express();

app.use(cookie());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// security
app.use(helmet());

// logging
app.use(requestsLogger);

// cors
app.use(allowCrossDomain);

// routing
app.use("/v1/users", userRouter);
app.use("/v1/quests", questRouter);
app.use("/v1/tags", tagRouter);
app.use("/v1/weekly-reports", weeklyReportRouter);
app.use("/v1/badge", badgeRouter);
if (process.env.NODE_ENV === "dev") {
  app.use("/v1/health", healthRouter);
}

// cron jobs
questCronJob.updateEveryDay();
questCronJob.updateEverySunday();
weeklyReportCronJob.updateEveryDay();
weeklyReportCronJob.createEverySunday();
badgeCronJob.upsertEverySunday();

const PORT = process.env.PORT;
app.listen(PORT, () => logger.info(`Server is running at http://localhost:${PORT}`));
