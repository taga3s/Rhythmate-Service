import cron from "node-cron";
import { logger } from "../pkg/logger/logger";
import { prisma } from "../db/db";
import { WeeklyReportModel } from "../model/weeklyReport/weekly_report_model";
import { getStartAndEndUTCDateTime } from "../utils/datetime";

const updateEveryDay = () => {
  const weeklyReportModel = new WeeklyReportModel();
  const scheduledTime = process.env.CRON_TZ === "UTC" ? "0 59 14 * * *" : "0 0 0 * * 1";

  cron.schedule(scheduledTime, async () => {
    await prisma.$transaction(async (tx) => {
      logger.info("Running cron job for updating weekly reports every day.");
      const users = await tx.user.findMany();

      await Promise.all(
        users.map(async (user) => {
          const targetWeeklyReport = await weeklyReportModel.getByUserId(user.id);
          if (targetWeeklyReport) {
            const updatedStreakDays =
              0 < targetWeeklyReport.completedQuests && targetWeeklyReport.failedQuests === 0
                ? targetWeeklyReport.streakDays + 1
                : targetWeeklyReport.streakDays;

            await weeklyReportModel.updateByIdWithTx(
              targetWeeklyReport.id,
              targetWeeklyReport.completedQuests,
              targetWeeklyReport.failedQuests,
              updatedStreakDays,
              targetWeeklyReport.completedQuestsEachDay,
              targetWeeklyReport.failedQuestsEachDay,
              targetWeeklyReport.completedPercentage,
              tx,
            );
          }
        }),
      );
    });
  });
};

const createEverySunday = () => {
  const weeklyReportModel = new WeeklyReportModel();
  const scheduledTime = process.env.CRON_TZ === "UTC" ? "0 0 15 * * 0" : "0 0 0 * * 1";

  cron.schedule(scheduledTime, async () => {
    const users = await prisma.user.findMany();
    const completedQuests = 0;
    const failedQuests = 0;
    const streakDays = 0;
    const completedQuestsEachDay = [0, 0, 0, 0, 0, 0, 0];
    const failedQuestsEachDay = [0, 0, 0, 0, 0, 0, 0];
    const { startUTC: startDate, endUTC: endDate } = getStartAndEndUTCDateTime();

    await prisma.$transaction(async (tx) => {
      logger.info("Running cron job for creating weekly reports every Sunday.");
      await Promise.all(
        users.map(
          async (user) =>
            await weeklyReportModel.createWithTx({
              completedQuests,
              failedQuests,
              streakDays,
              completedQuestsEachDay,
              failedQuestsEachDay,
              startDate,
              endDate,
              userId: user.id,
              tx,
            }),
        ),
      );
    });
  });
};

export const weeklyReportCronJob = {
  createEverySunday,
  updateEveryDay,
};
