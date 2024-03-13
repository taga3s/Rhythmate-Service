import cron from "node-cron";
import { prisma } from "../../db/db";
import { logger } from "../../pkg/logger";
import { WeeklyReportModel } from "./weekly_report_model";

async function createEverySunday(): Promise<void> {
  const weeklyReportModel = new WeeklyReportModel();

  cron.schedule("59 59 23 * * 0", async () => {
    logger.info("Running cron job for creating weekly reports every Sunday.");
    //'59 59 23 * * 0'
    const users = await prisma.user.findMany();
    try {
      const result = await Promise.all(
        users.map(async (user) => {
          return await weeklyReportModel.create(0, 0, 0, [0, 0, 0, 0, 0, 0, 0], user.id);
        }),
      );
      return result;
    } catch (error) {
      logger.error(error);
      return error;
    }
  });
}

export const cronWeeklyReportModel = {
  createEverySunday,
};
