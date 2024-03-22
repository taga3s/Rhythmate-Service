import { prisma } from "../../db/db";
import { QuestModel } from "../../model/quest/quest_model";

export const createQuestService = async (inputDTO: {
  title: string;
  description: string;
  startsAt: string;
  minutes: number;
  tagId: string;
  difficulty: string;
  days: string[];
  state: string;
  userId: string;
}) => {
  return prisma.$transaction(async (tx) => {
    const model = new QuestModel();

    const quest = await model.createWithTx(
      inputDTO.title,
      inputDTO.description,
      inputDTO.startsAt,
      inputDTO.minutes,
      inputDTO.tagId,
      inputDTO.state,
      inputDTO.difficulty,
      inputDTO.days,
      inputDTO.userId,
      tx,
    );

    return {
      id: quest.id,
      title: quest.title,
      description: quest.description,
      startsAt: quest.startsAt,
      startedAt: quest.startedAt,
      minutes: quest.minutes,
      tagId: quest.tagId,
      difficulty: quest.difficulty,
      state: quest.state,
      isSucceeded: quest.isSucceeded,
      startDate: quest.startDate,
      endDate: quest.endDate,
      days: quest.days,
      weeklyFrequency: quest.weeklyFrequency,
    };
  });
};
