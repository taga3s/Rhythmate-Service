import { Prisma, PrismaClient } from "@prisma/client";
import cron from "node-cron";

const prisma = new PrismaClient();

const getStartEndJstDate = () => {
  const dateNowObject = new Date();
  const nextSundayDateObject = new Date(
    dateNowObject.getFullYear(),
    dateNowObject.getMonth(),
    dateNowObject.getDate() + (6 - ((dateNowObject.getDay() + 6) % 7)),
  );
  const dateNowJst = dateNowObject.toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" });
  const nextSundayJst = nextSundayDateObject.toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" });
  return { dateNowJst, nextSundayJst };
};

async function EveryDay(): Promise<any> {
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

async function EverySunday(): Promise<any> {
  cron.schedule("59 59 23 * * 0", async () => {
    const { dateNowJst, nextSundayJst } = getStartEndJstDate();
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
  EveryDay,
  EverySunday,
};
