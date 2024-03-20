import cron from "node-cron";
import { prisma } from "../../db/db";
import { getStartAndEndJstDateTime } from "../funcs/dateTime";
import { logger } from "../../pkg/logger";

const updateEveryDay = () => {
  const scheduledTime = process.env.CRON_TZ === "UTC" ? "59 59 14 * * *" : "59 59 23 * * *";

  cron.schedule(scheduledTime, async () => {
    await prisma.$transaction(async (tx) => {
      logger.info("Running cron job for updating quests every day.");
      const result = await tx.quest.updateMany({
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
      const { dateNowJst, nextSundayJst } = getStartAndEndJstDateTime();
      const result = await tx.quest.updateMany({
        data: {
          startDate: dateNowJst,
          endDate: nextSundayJst,
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
