import { Prisma, PrismaClient } from "@prisma/client";
import { WeeklyReport } from "./types";

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

const create = async (
  completedQuests: number,
  failedQuests: number,
  completedDays: number,
  completedQuestsEachDay: number[],
  userId: string,
): Promise<WeeklyReport> => {
  const completedPercentage = failedQuests === 0 ? 0 : (completedQuests / (completedQuests + failedQuests)) * 100;
  const { dateNowJst, nextSundayJst } = getStartEndJstDate();
  const weeklyReport: Prisma.WeeklyReportCreateInput = {
    completedQuests: completedQuests,
    failedQuests: failedQuests,
    completedPercentage: completedPercentage,
    completedDays: completedDays,
    completedQuestsEachDay: completedQuestsEachDay,
    startDate: dateNowJst,
    endDate: nextSundayJst,
    user: {
      connect: {
        id: userId,
      },
    },
  };

  const result = await prisma.weeklyReport.create({ data: weeklyReport });
  return result;
};

const update = async (
  completedQuests: number,
  failedQuests: number,
  completedDays: number,
  completedQuestsEachDay: number[],
  startDate: string,
  endDate: string,
  userId: string,
): Promise<WeeklyReport> => {
  const completedPercentage = (completedQuests / (completedQuests + failedQuests)) * 100;
  const weeklyReport: Prisma.WeeklyReportUpdateInput = {
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

  const result = await prisma.weeklyReport.update({ where: { id: userId }, data: weeklyReport });
  return result;
};

const updateByUserId = async (
  userId: string,
  completedQuestsIncrements: number,
  failedQuestsIncrements: number,
  completedDaysIncrements: number,
  completedQuestsEachDayIncrements: number,
): Promise<WeeklyReport> => {
  const weeklyReport = await prisma.weeklyReport.findFirst({
    // 最新の週報を取得
    where: {
      userId: userId,
    },
    orderBy: {
      endDate: "desc",
    },
  });
  if (!weeklyReport) {
    throw new Error("指定したuserIdの週報が存在しません");
  }
  const index = (new Date().getDay() + 6) % 7; // 0: 月曜日, 1: 火曜日...
  weeklyReport.completedQuestsEachDay[index] += completedQuestsEachDayIncrements; // 今日の日付の要素を更新
  const result = await prisma.weeklyReport.update({
    where: { id: weeklyReport.id },
    data: {
      completedQuests: { increment: completedQuestsIncrements },
      failedQuests: { increment: failedQuestsIncrements },
      completedDays: { increment: completedDaysIncrements },
      completedQuestsEachDay: weeklyReport.completedQuestsEachDay,
    },
  });
  return result;
};

const deleteById = async (id: string): Promise<WeeklyReport | null> => {
  const result = await prisma.weeklyReport.delete({ where: { id: id } });
  return result;
};

const getById = async (id: string): Promise<WeeklyReport | null> => {
  const result = await prisma.weeklyReport.findUnique({
    where: {
      id: id,
    },
  });
  return result;
};

const listByUserId = async (userId: string): Promise<WeeklyReport[]> => {
  const result = await prisma.weeklyReport.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      endDate: "desc",
    },
  });
  return result;
};

export const weeklyReportModel = {
  create,
  update,
  updateByUserId,
  deleteById,
  getById,
  listByUserId,
};
