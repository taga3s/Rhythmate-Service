import cron from "node-cron";
import { prisma } from "../../db/db";
import { getStartAndEndJstDateTime } from "../funcs/dateTime";

async function updateEveryDay(): Promise<any> {
  cron.schedule("59 59 23 * * *", async () => {
    const result = await prisma.quest.updateMany({
      data: {
        state: "INACTIVE",
        startedAt: "NOT_STARTED_YET",
        isSucceeded: false,
      },
    });
    return result;
  });
}

async function updateEverySunday(): Promise<any> {
  cron.schedule("59 59 23 * * 0", async () => {
    const { dateNowJst, nextSundayJst } = getStartAndEndJstDateTime();
    const result = await prisma.quest.updateMany({
      data: {
        startDate: dateNowJst,
        endDate: nextSundayJst,
        weeklyCompletionCount: 0,
      },
    });
    return result;
  });
}

export const cronQuestModel = {
  updateEveryDay,
  updateEverySunday,
};
