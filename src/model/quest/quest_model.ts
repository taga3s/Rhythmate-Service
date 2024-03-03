import { Prisma } from "@prisma/client";
import { Quest } from "./types";
import { formatDateTime, now } from "../../pkg/dayjs";
import { prisma } from "../../db/db";
import { getStartAndEndJstDateTime } from "../funcs/dateTime";

const create = async (
  title: string,
  description: string,
  startsAt: string,
  minutes: number,
  tagId: string,
  state: string,
  difficulty: string,
  dates: string[],
  userId: string,
): Promise<Quest> => {
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
    dates: dates,
    weeklyFrequency: dates.length,
    user: {
      connect: {
        id: userId,
      },
    },
  };

  const result = await prisma.quest.create({ data: quest });
  return result;
};

const update = async (
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
  dates: string[],
  weeklyCompletionCount: number,
  totalCompletionCount: number,
  userId: string,
): Promise<Quest> => {
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
    dates: dates,
    weeklyFrequency: dates.length,
    weeklyCompletionCount: weeklyCompletionCount,
    totalCompletionCount: totalCompletionCount,
    updatedAt: new Date(),
    user: {
      connect: {
        id: userId,
      },
    },
  };
  const result = await prisma.quest.update({ where: { id: id }, data: quest });
  return result;
};

const getById = async (id: string): Promise<Quest | null> => {
  const result = await prisma.quest.findFirst({
    where: {
      id: id,
    },
  });
  return result;
};

const deleteById = async (id: string): Promise<Quest | null> => {
  const result = await prisma.quest.delete({ where: { id: id } });
  return result;
};

const listByUserId = async (userId: string): Promise<Quest[] | null> => {
  const result = await prisma.quest.findMany({
    where: {
      userId: userId,
    },
  });
  return result;
};

const startById = async (id: string): Promise<Quest | null> => {
  const quest: Prisma.QuestUpdateInput = {
    startedAt: formatDateTime(now()),
  };
  const result = await prisma.quest.update({ where: { id: id }, data: quest });
  return result;
};

const finishById = async (id: string, continuationLevel: number): Promise<Quest | null> => {
  const continuationLevelIncrement = continuationLevel === 7 ? 0 : 1;
  const updatedQuest: Prisma.QuestUpdateInput = {
    isSucceeded: true,
    state: "ACTIVE",
    continuationLevel: { increment: continuationLevelIncrement },
    weeklyCompletionCount: { increment: 1 },
    totalCompletionCount: { increment: 1 },
  };
  const result = await prisma.quest.update({ where: { id: id }, data: updatedQuest });
  return result;
};

const forceFinishById = async (id: string): Promise<Quest> => {
  const updatedQuest: Prisma.QuestUpdateInput = {
    isSucceeded: false,
    state: "ACTIVE",
    continuationLevel: 0,
  };

  const result = await prisma.quest.update({ where: { id: id }, data: updatedQuest });
  return result;
};

export const questModel = {
  listByUserId,
  getById,
  create,
  update,
  deleteById,
  startById,
  finishById,
  forceFinishById,
};
