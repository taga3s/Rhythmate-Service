import cron from "node-cron";
import { prisma } from "../db/db";
import { logger } from "../pkg/logger/logger";

const updateEveryDay = () => {
  const scheduledTime = process.env.CRON_TZ === "UTC" ? "0 0 15 * * *" : "0 0 0 * * *";

  cron.schedule(scheduledTime, async () => {
    await prisma.$transaction(async (tx) => {
      logger.info("Running cron job for updating quests every day.");
      await tx.quest.updateMany({
        data: {
          state: "INACTIVE",
          startedAt: "NOT_STARTED_YET",
          isSucceeded: false,
        },
      });
    });
  });
};

const updateEverySunday = () => {
  const scheduledTime = process.env.CRON_TZ === "UTC" ? "0 0 15 * * 0" : "0 0 0 * * 1";

  cron.schedule(scheduledTime, async () => {
    await prisma.$transaction(async (tx) => {
      logger.info("Running cron job for updating quests every Sunday.");
      await tx.quest.updateMany({
        data: {
          weeklyCompletionCount: 0,
        },
      });
    });
  });
};

export const questCronJob = {
  updateEveryDay,
  updateEverySunday,
};
