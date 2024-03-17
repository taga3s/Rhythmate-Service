import { Prisma } from "@prisma/client";
import { prisma } from "../../db/db";
import { PrismaClientWithTx } from "../../db/types";
import { formatDateTime, now } from "../../pkg/dayjs";
import { getStartAndEndJstDateTime } from "../funcs/dateTime";
import { Quest } from "./types";

export class QuestModel {
  public async getById(id: string): Promise<Quest | null> {
    const result = await prisma.quest.findFirst({
      where: {
        id: id,
      },
    });
    return result;
  }

  public async listByUserId(userId: string): Promise<Quest[] | null> {
    const result = await prisma.quest.findMany({
      where: {
        userId: userId,
      },
    });
    return result;
  }

  public async createWithTx(
    title: string,
    description: string,
    startsAt: string,
    minutes: number,
    tagId: string,
    state: string,
    difficulty: string,
    days: string[],
    userId: string,
    tx: PrismaClientWithTx,
  ): Promise<Quest> {
    const { dateNowJst, nextSundayJst } = getStartAndEndJstDateTime();
    const quest: Prisma.QuestCreateInput = {
      title: title,
      description: description,
      startsAt: startsAt,
      startedAt: "NOT_STARTED_YET",
      minutes: minutes,
      tagId: tagId ?? "NO_TAG_ASSIGNED",
      state: state,
      difficulty: difficulty,
      startDate: dateNowJst,
      endDate: nextSundayJst,
      days: days,
      weeklyFrequency: days.length,
      user: {
        connect: {
          id: userId,
        },
      },
    };
    const result = await tx.quest.create({ data: quest });
    return result;
  }

  public async deleteByIdWithTx(id: string, tx: PrismaClientWithTx): Promise<Quest | null> {
    const result = await tx.quest.delete({ where: { id: id } });
    return result;
  }

  public async updateWithTx(
    id: string,
    title: string,
    description: string,
    startsAt: string,
    startedAt: string,
    minutes: number,
    tagId: string,
    difficulty: string,
    state: string,
    isSucceeded: boolean,
    continuationLevel: number,
    startDate: string,
    endDate: string,
    days: string[],
    weeklyCompletionCount: number,
    totalCompletionCount: number,
    userId: string,
    tx: PrismaClientWithTx,
  ): Promise<Quest> {
    const quest: Prisma.QuestUpdateInput = {
      id: id,
      title: title,
      description: description,
      startsAt: startsAt,
      startedAt: startedAt,
      minutes: minutes,
      tagId: tagId,
      difficulty: difficulty,
      state: state,
      isSucceeded: isSucceeded,
      continuationLevel: continuationLevel,
      startDate: startDate,
      endDate: endDate,
      days: days,
      weeklyFrequency: days.length,
      weeklyCompletionCount: weeklyCompletionCount,
      totalCompletionCount: totalCompletionCount,
      updatedAt: new Date(),
      user: {
        connect: {
          id: userId,
        },
      },
    };
    const result = await tx.quest.update({
      where: { id: id },
      data: quest,
    });
    return result;
  }

  public async startByIdWithTx(id: string, tx: PrismaClientWithTx): Promise<Quest | null> {
    const quest: Prisma.QuestUpdateInput = {
      startedAt: formatDateTime(now()),
    };
    const result = await tx.quest.update({
      where: { id: id },
      data: quest,
    });
    return result;
  }

  public async finishByIdWithTx(id: string, continuationLevel: number, tx: PrismaClientWithTx): Promise<Quest | null> {
    const continuationLevelIncrement = continuationLevel === 7 ? 0 : 1;
    const updatedQuest: Prisma.QuestUpdateInput = {
      isSucceeded: true,
      state: "ACTIVE",
      continuationLevel: { increment: continuationLevelIncrement },
      weeklyCompletionCount: { increment: 1 },
      totalCompletionCount: { increment: 1 },
    };
    const result = await tx.quest.update({
      where: { id: id },
      data: updatedQuest,
    });
    return result;
  }

  public async forceFinishByIdWithTx(id: string, tx: PrismaClientWithTx): Promise<Quest> {
    const updatedQuest: Prisma.QuestUpdateInput = {
      isSucceeded: false,
      state: "ACTIVE",
      continuationLevel: 1,
    };
    const result = await tx.quest.update({
      where: { id: id },
      data: updatedQuest,
    });
    return result;
  }
}
