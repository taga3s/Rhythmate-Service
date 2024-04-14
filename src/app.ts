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
import session from "express-session";
import { now } from "./pkg/dayjs";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// session
app.use(
  session({
    name: "_rhythmate_session",
    secret: process.env.SECRET!,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === "dev" ? false : true, maxAge: 1000 * 60 * 60 * 24 * 7 },
  }),
);
app.use(cookie());
app.use(cookieParser());

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
weeklyReportCronJob.createEverySunday();
badgeCronJob.upsertEverySunday();

const PORT = process.env.PORT;
app.listen(PORT, () => logger.info(`Server is running at http://localhost:${PORT}`));
