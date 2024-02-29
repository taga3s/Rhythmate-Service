import { Prisma, PrismaClient } from "@prisma/client";
import { Quest } from "./types";
import { formatDateTime, now } from "../../pkg/dayjs";
import { prisma } from "../../db/db";

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
  title: string,
  description: string,
  startsAt: string,
  minutes: number,
  tagId: string,
  difficulty: string,
  dates: string[],
  userId: string,
): Promise<Quest> => {
  const { dateNowJst, nextSundayJst } = getStartEndJstDate();
  const quest: Prisma.QuestCreateInput = {
    title: title,
    description: description,
    startsAt: startsAt,
    startedAt: "NOT_STARTED_YET",
    minutes: minutes,
    tagId: tagId !== null ? tagId : "NO_TAG_ASSIGNED",
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

// const handlePrismaError = (err) => {
//   switch (err.code) {
//       case 'P2002':
//           // handling duplicate key errors
//           return new HttpError(`Duplicate field value: ${err.meta.target}`, 400);
//       case 'P2014':
//           // handling invalid id errors
//           return new HttpError(`Invalid ID: ${err.meta.target}`, 400);
//       case 'P2003':
//           // handling invalid data errors
//           return new HttpError(`Invalid input data: ${err.meta.target}`, 400);
//       default:
//           // handling all other errors
//           return new HttpError(`Something went wrong: ${err.message}`, 500);
//   }
// };

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
