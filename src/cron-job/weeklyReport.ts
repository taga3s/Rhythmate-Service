import cron from "node-cron";
import { logger } from "../pkg/logger";
import { prisma } from "../db/db";
import { WeeklyReportModel } from "../model/weeklyReport/weekly_report_model";

const createEverySunday = () => {
  const weeklyReportModel = new WeeklyReportModel();
  const scheduledTime = process.env.CRON_TZ === "UTC" ? "59 59 14 * * 0" : "59 59 23 * * 0";

  cron.schedule(scheduledTime, async () => {
    logger.info("Running cron job for creating weekly reports every Sunday.");
    //'59 59 23 * * 0'
    const users = await prisma.user.findMany();
    await prisma.$transaction(async (tx) => {
      await Promise.all(
        users.map(async (user) => await weeklyReportModel.createWithTx(0, 0, 0, [0, 0, 0, 0, 0, 0, 0], user.id, tx)),
      );
    });
  });
};

export const cronWeeklyReportModel = {
  createEverySunday,
};
