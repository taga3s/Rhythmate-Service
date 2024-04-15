import cron from "node-cron";
import { logger } from "../pkg/logger";
import { prisma } from "../db/db";
import { WeeklyReportModel } from "../model/weeklyReport/weekly_report_model";
import { getStartAndEndUTCDateTime } from "../funcs/datetime";

const updateEveryDay = () => {
  const weeklyReportModel = new WeeklyReportModel();
  const scheduledTime = process.env.CRON_TZ === "UTC" ? "0 0 15 * * *" : "0 0 0 * * 1";

  cron.schedule(scheduledTime, async () => {
    await prisma.$transaction(async (tx) => {
      const users = await tx.user.findMany();

      await Promise.all(
        users.map(async (user) => {
          const targetWeeklyReport = await weeklyReportModel.getByUserId(user.id);
          if (!targetWeeklyReport) {
            return;
          }

          const updatedStreakDays =
            0 < targetWeeklyReport.completedQuests && targetWeeklyReport.failedQuests === 0
              ? targetWeeklyReport.streakDays + 1
              : targetWeeklyReport.streakDays;

          await weeklyReportModel.updateWithTx(
            targetWeeklyReport.completedQuests,
            targetWeeklyReport.failedQuests,
            updatedStreakDays,
            targetWeeklyReport.completedQuestsEachDay,
            targetWeeklyReport.failedQuestsEachDay,
            targetWeeklyReport.startDate,
            targetWeeklyReport.endDate,
            targetWeeklyReport.userId,
            tx,
          );
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
            await weeklyReportModel.createWithTx(
              completedQuests,
              failedQuests,
              streakDays,
              completedQuestsEachDay,
              failedQuestsEachDay,
              startDate,
              endDate,
              user.id,
              tx,
            ),
        ),
      );
    });
  });
};

export const weeklyReportCronJob = {
  createEverySunday,
  updateEveryDay,
};
