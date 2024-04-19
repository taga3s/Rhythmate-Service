import { Prisma } from "@prisma/client";
import { prisma } from "../../db/db";
import { PrismaClientWithTx } from "../../db/types";
import { WeeklyReport } from "./types";

export class WeeklyReportModel {
  public async createWithTx(
    completedQuests: number,
    failedQuests: number,
    streakDays: number,
    completedQuestsEachDay: number[],
    failedQuestsEachDay: number[],
    startDate: string,
    endDate: string,
    userId: string,
    tx: PrismaClientWithTx,
  ): Promise<WeeklyReport> {
    const completedPercentage = failedQuests === 0 ? 0 : (completedQuests / (completedQuests + failedQuests)) * 100;
    const weeklyReport: Prisma.WeeklyReportCreateInput = {
      completedQuests: completedQuests,
      failedQuests: failedQuests,
      completedPercentage: completedPercentage,
      streakDays: streakDays,
      completedQuestsEachDay: completedQuestsEachDay,
      failedQuestsEachDay: failedQuestsEachDay,
      startDate: startDate,
      endDate: endDate,
      user: {
        connect: {
          id: userId,
        },
      },
    };

    const result = await tx.weeklyReport.create({ data: weeklyReport });
    return result;
  }

  public async updateWithTx(
    completedQuests: number,
    failedQuests: number,
    streakDays: number,
    completedQuestsEachDay: number[],
    failedQuestsEachDay: number[],
    startDate: string,
    endDate: string,
    userId: string,
    tx: PrismaClientWithTx,
  ): Promise<WeeklyReport> {
    const completedPercentage = (completedQuests / (completedQuests + failedQuests)) * 100;
    const weeklyReport: Prisma.WeeklyReportUpdateInput = {
      completedQuests: completedQuests,
      failedQuests: failedQuests,
      completedPercentage: completedPercentage,
      streakDays: streakDays,
      completedQuestsEachDay: completedQuestsEachDay,
      failedQuestsEachDay: failedQuestsEachDay,
      startDate: startDate,
      endDate: endDate,
      user: {
        connect: {
          id: userId,
        },
      },
    };

    const result = await tx.weeklyReport.update({
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
        createdAt: "desc",
      },
    });
    return result;
  }

  public async updateByIdWithTx(
    id: string,
    completedQuests: number,
    failedQuests: number,
    streakDays: number,
    completedQuestsEachDay: number[],
    failedQuestsEachDay: number[],
    completedPercentage: number,
    tx: PrismaClientWithTx,
  ): Promise<WeeklyReport> {
    const result = await tx.weeklyReport.update({
      where: { id: id },
      data: {
        completedQuests: completedQuests,
        failedQuests: failedQuests,
        streakDays: streakDays,
        completedQuestsEachDay: completedQuestsEachDay,
        failedQuestsEachDay: failedQuestsEachDay,
        completedPercentage: completedPercentage,
      },
    });
    return result;
  }

  public async updateFeedBackByIdWithTx(id: string, feedBack: string, tx: PrismaClientWithTx): Promise<WeeklyReport> {
    const result = await tx.weeklyReport.update({
      where: { id: id },
      data: {
        feedBack: feedBack,
      },
    });
    return result;
  }

  public async deleteByIdWithTx(id: string, tx: PrismaClientWithTx): Promise<WeeklyReport | null> {
    const result = await tx.weeklyReport.delete({ where: { id: id } });
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
        createdAt: "desc",
      },
    });
    return result;
  }
}
