import { Prisma, PrismaClient } from "@prisma/client";
import { WeeklyReport } from "./types";

const prisma = new PrismaClient();

const create = async (
  completedQuests: number,
  failedQuests: number,
  completedPercentage: number,
  completedDays: number,
  completedQuestsEachDay: number[],
  startDate: Date,
  endDate: Date,
  userId: string,
): Promise<WeeklyReport> => {
  const weeklyReport: Prisma.WeeklyReportCreateInput = {
    completedQuests: completedQuests,
    failedQuests: failedQuests,
    completedPercentage: completedPercentage,
    completedDays: completedDays,
    completedQuestsEachDay: completedQuestsEachDay,
    startDate: startDate,
    endDate: endDate,
    user: {
      connect: {
        id: userId,
      },
    },
  };

  const result = await prisma.weeklyReport.create({ data: weeklyReport });
  return result;
}