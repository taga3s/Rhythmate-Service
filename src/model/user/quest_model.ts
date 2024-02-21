import { Prisma, PrismaClient } from "@prisma/client"
import { Quest } from "./types"

const prisma = new PrismaClient()

const create = async (id: string, title: string, description: string, startsAt: Date, startedAt: Date, minutes: number, tagId: string, difficulty: string, isDone: boolean, startDate: Date, endDate: Date, dates: string[], weeklyFrequency: number, weeklyCompletionCount: number, createdAt: Date, updatedAt: Date, userId: string): Promise<Quest> => {
  const quest: Prisma.QuestCreateInput = {
      id: id,
      title: title,
      description: description,
      startsAt: startsAt,
      startedAt: startedAt,
      minutes: minutes,
      tagId: tagId,
      difficulty: difficulty,
      isDone: isDone,
      startDate: startDate,
      endDate: endDate,
      dates: dates,
      weeklyFrequency: weeklyFrequency,
      weeklyCompletionCount: weeklyCompletionCount,
      createdAt: createdAt,
      updatedAt: updatedAt,
      userId: userId
    }
  const result = await prisma.quest.create({ data: quest });
  return result
}

const update = async (id: string, title: string, description: string, startsAt: Date, startedAt: Date, minutes: number, tagId: string, difficulty: string, isDone: boolean, startDate: Date, endDate: Date, dates: string[], weeklyFrequency: number, weeklyCompletionCount: number, createdAt: Date, updatedAt: Date, userId: string): Promise<Quest> => {
  const quest: Prisma.QuestUpdateInput = {
      id: id,
      title: title,
      description: description,
      startsAt: startsAt,
      startedAt: startedAt,
      minutes: minutes,
      tagId: tagId,
      difficulty: difficulty,
      isDone: isDone,
      startDate: startDate,
      endDate: endDate,
      dates: dates,
      weeklyFrequency: weeklyFrequency,
      weeklyCompletionCount: weeklyCompletionCount,
      createdAt: createdAt,
      updatedAt: updatedAt,
      userId: userId
    }
  const result = await prisma.quest.update({ where: { id: id }, data: quest });
  return result
}

const deleteById = async (id: string): Promise<Quest> => {
  const result = await prisma.quest.delete({ where: { id: id } });
  return result
}

const getByUserId = async (userId: string): Promise<Quest[]> => {
  const result = await prisma.quest.findMany({
    where: {
      userId: userId
    }
  })
  return result
}



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
  deleteById,
  create,
  update
}