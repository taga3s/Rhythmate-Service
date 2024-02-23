import { Prisma, PrismaClient } from "@prisma/client";
import { WeeklyReport } from "./types";

const prisma = new PrismaClient();

const create = async (
  completedQuests: number,
  failedQuests: number,
  completedDays: number,
  completedQuestsEachDay: number[],
  userId: string,
): Promise<WeeklyReport> => {
  const completedPercentage = (completedQuests / (completedQuests + failedQuests)) * 100;
  const date_now = new Date();
  const next_sunday = new Date(
    date_now.getFullYear(),
    date_now.getMonth(),
    date_now.getDate() + (7 - date_now.getDay()),
  );
  const weeklyReport: Prisma.WeeklyReportCreateInput = {
    completedQuests: completedQuests,
    failedQuests: failedQuests,
    completedPercentage: completedPercentage,
    completedDays: completedDays,
    completedQuestsEachDay: completedQuestsEachDay,
    startDate: date_now,
    endDate: next_sunday,
    user: {
      connect: {
        id: userId,
      },
    },
  };

  const result = await prisma.weeklyReport.create({ data: weeklyReport });
  return result;
}

const update = async (
  completedQuests: number,
  failedQuests: number,
  completedDays: number,
  completedQuestsEachDay: number[],
  startDate: Date,
  endDate: Date,
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
}

const deleteById = async (id: string): Promise<WeeklyReport | null> => {
  const result = await prisma.weeklyReport.delete({ where: { id: id } });
  return result;
}

const getById = async (id: string): Promise<WeeklyReport | null> => {
  const result = await prisma.weeklyReport.findFirst({
    where: {
      id: id,
    },
  });
  return result;
};

const getByUserId = async (userId: string): Promise<WeeklyReport[]> => {
  const result = await prisma.weeklyReport.findMany({
    where: {
      userId: userId,
    },
  });
  return result;
}

export const weeklyReportModel = {
  create,
  update,
  deleteById,
  getById,
  getByUserId,
};
