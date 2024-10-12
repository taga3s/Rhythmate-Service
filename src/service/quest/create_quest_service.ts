import { prisma } from "../../db/db";
import { QuestModel } from "../../model/quest/quest_model";

type InputDTO = {
  title: string;
  description: string;
  startsAt: string;
  minutes: number;
  tagId: string;
  difficulty: string;
  days: string[];
  state: string;
  userId: string;
};

export const createQuestService = async (inputDTO: InputDTO) => {
  return prisma.$transaction(async (tx) => {
    const model = new QuestModel();

    const quest = await model.createWithTx({
      title: inputDTO.title,
      description: inputDTO.description,
      startsAt: inputDTO.startsAt,
      minutes: inputDTO.minutes,
      tagId: inputDTO.tagId,
      state: inputDTO.state,
      difficulty: inputDTO.difficulty,
      days: inputDTO.days,
      userId: inputDTO.userId,
      tx,
    });

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
      days: quest.days,
      continuationLevel: quest.continuationLevel,
      weeklyFrequency: quest.weeklyFrequency,
      weeklyCompletionCount: quest.weeklyCompletionCount,
      totalCompletionCount: quest.totalCompletionCount,
    };
  });
};
