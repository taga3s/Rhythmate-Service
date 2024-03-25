import cron from "node-cron";
import { prisma } from "../db/db";
import { logger } from "../pkg/logger";
import { getStartAndEndUtcDateTime } from "../model/funcs/dateTime";

const updateEveryDay = () => {
  const scheduledTime = process.env.CRON_TZ === "UTC" ? "59 59 14 * * *" : "59 59 23 * * *";

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
  const scheduledTime = process.env.CRON_TZ === "UTC" ? "59 59 14 * * 0" : "59 59 23 * * 0";

  cron.schedule(scheduledTime, async () => {
    await prisma.$transaction(async (tx) => {
      logger.info("Running cron job for updating quests every Sunday.");
      const { dateNowUtc, nextSundayUtc } = getStartAndEndUtcDateTime();
      await tx.quest.updateMany({
        data: {
          startDate: dateNowUtc,
          endDate: nextSundayUtc,
          weeklyCompletionCount: 0,
        },
      });
    });
  });
};

export const cronQuestModel = {
  updateEveryDay,
  updateEverySunday,
};
