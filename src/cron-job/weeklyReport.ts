import cron from "node-cron";
import { logger } from "../pkg/logger";
import { prisma } from "../db/db";
import { WeeklyReportModel } from "../model/weeklyReport/weekly_report_model";

const createEverySunday = () => {
  const weeklyReportModel = new WeeklyReportModel();
  const scheduledTime = process.env.CRON_TZ === "UTC" ? "5 0 15 * * 0" : "0 0 0 * * 1";

  cron.schedule(scheduledTime, async () => {
    logger.info("Running cron job for creating weekly reports every Sunday.");
    //'59 59 23 * * 0'
    const users = await prisma.user.findMany();
    const completedQuests = 0;
    const failedQuests = 0;
    const completedDays = 0;
    const completedQuestsEachDay = [0, 0, 0, 0, 0, 0, 0];
    const failedQuestsEachDay = [0, 0, 0, 0, 0, 0, 0];
    await prisma.$transaction(async (tx) => {
      await Promise.all(
        users.map(
          async (user) =>
            await weeklyReportModel.createWithTx(
              completedQuests,
              failedQuests,
              completedDays,
              completedQuestsEachDay,
              failedQuestsEachDay,
              user.id,
              tx,
            ),
        ),
      );
    });
  });
};

export const cronWeeklyReportModel = {
  createEverySunday,
};
