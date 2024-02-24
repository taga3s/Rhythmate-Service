import { Prisma, PrismaClient } from "@prisma/client";
import { Quest } from "./types";

const prisma = new PrismaClient();

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
  const date_now = new Date();
  const next_sunday = new Date(
    date_now.getFullYear(),
    date_now.getMonth(),
    date_now.getDate() + (7 - date_now.getDay()),
  );
  const quest: Prisma.QuestCreateInput = {
    title: title,
    description: description,
    startsAt: startsAt,
    startedAt: "NOT_STARTED_YET",
    minutes: minutes,
    tagId: tagId !== null ? tagId : "NO_TAG_ASSIGNED",
    difficulty: difficulty,
    startDate: date_now,
    endDate: next_sunday,
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
  startDate: Date,
  endDate: Date,
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

const getByUserId = async (userId: string): Promise<Quest[] | null> => {
  const result = await prisma.quest.findMany({
    where: {
      userId: userId,
    },
  });
  return result;
};

const startById = async (id: string): Promise<Quest | null> => {
  const quest: Prisma.QuestUpdateInput = {
    id: id,
    startedAt: new Date().toLocaleTimeString(),
  };
  const result = await prisma.quest.update({ where: { id: id }, data: quest });
  return result;
};

const finishById = async (id: string): Promise<Quest | null> => {
  const quest: Prisma.QuestUpdateInput = {
    id: id,
    isSucceeded: true,
    state: "inactive",
    continuationLevel: { increment: 1 },
    weeklyCompletionCount: { increment: 1 },
    totalCompletionCount: { increment: 1 },
  };

  const result = await prisma.quest.update({ where: { id: id }, data: quest });
  return result;
};

// const handlePrismaError = (err) => {
//   switch (err.code) {
//       case 'P2002':
//           // handling duplicate key errors
//           return new CustomError(`Duplicate field value: ${err.meta.target}`, 400);
//       case 'P2014':
//           // handling invalid id errors
//           return new CustomError(`Invalid ID: ${err.meta.target}`, 400);
//       case 'P2003':
//           // handling invalid data errors
//           return new CustomError(`Invalid input data: ${err.meta.target}`, 400);
//       default:
//           // handling all other errors
//           return new CustomError(`Something went wrong: ${err.message}`, 500);
//   }
// };

export const questModel = {
  getByUserId,
  getById,
  create,
  update,
  deleteById,
  startById,
  finishById,
};
