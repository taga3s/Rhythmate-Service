import { Prisma } from "@prisma/client";
import { prisma } from "../../db/db";
import { getStartAndEndJstDateTime } from "../funcs/dateTime";
import { WeeklyReport } from "./types";
import { PrismaClientWithTx } from "../../db/types";

export class WeeklyReportModel {
  public async createWithTx(
    completedQuests: number,
    failedQuests: number,
    completedDays: number,
    completedQuestsEachDay: number[],
    userId: string,
    tx: PrismaClientWithTx,
  ): Promise<WeeklyReport> {
    const completedPercentage = failedQuests === 0 ? 0 : (completedQuests / (completedQuests + failedQuests)) * 100;
    const { dateNowJst, nextSundayJst } = getStartAndEndJstDateTime();
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

    const result = await tx.weeklyReport.create({ data: weeklyReport });
    return result;
  }

  public async update(
    completedQuests: number,
    failedQuests: number,
    completedDays: number,
    completedQuestsEachDay: number[],
    startDate: string,
    endDate: string,
    userId: string,
  ): Promise<WeeklyReport> {
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

    const result = await prisma.weeklyReport.update({
      where: { id: userId },
      data: weeklyReport,
    });
    return result;
  }
  public async getByUserId(userId: string): Promise<WeeklyReport | null> {
    const result = await prisma.weeklyReport.findFirst({
      // 最新の週報を取得
      where: {
        userId: userId,
      },
      orderBy: {
        endDate: "desc",
      },
    });
    return result;
  }

  public async updateByIdWithTx(
    id: string,
    completedQuestsIncrements: number,
    failedQuestsIncrements: number,
    completedDaysIncrements: number,
    completedQuestsEachDay: number[],
    tx: PrismaClientWithTx,
  ): Promise<WeeklyReport> {
    const result = await tx.weeklyReport.update({
      where: { id: id },
      data: {
        completedQuests: { increment: completedQuestsIncrements },
        failedQuests: { increment: failedQuestsIncrements },
        completedDays: { increment: completedDaysIncrements },
        completedQuestsEachDay: completedQuestsEachDay,
      },
    });
    return result;
  }

  public async deleteById(id: string): Promise<WeeklyReport | null> {
    const result = await prisma.weeklyReport.delete({ where: { id: id } });
    return result;
  }

  public async getById(id: string): Promise<WeeklyReport | null> {
    const result = await prisma.weeklyReport.findUnique({
      where: {
        id: id,
      },
    });
    return result;
  }

  public async listByUserId(userId: string): Promise<WeeklyReport[]> {
    const result = await prisma.weeklyReport.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        endDate: "desc",
      },
    });
    return result;
  }
}
