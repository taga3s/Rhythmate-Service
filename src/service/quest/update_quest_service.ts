import { prisma } from "../../db/db";
import { QuestModel } from "../../model/quest/quest_model";
import { HttpError } from "../../pkg/httpError";

type InputDTO = {
  id: string;
  title: string;
  description: string;
  startsAt: string;
  state: string;
  minutes: number;
  tagId: string;
  difficulty: string;
  days: string[];
  userId: string;
};

export const updateQuestService = async (inputDTO: InputDTO) => {
  return prisma.$transaction(async (tx) => {
    const questModel = new QuestModel();

    const quest = await questModel.getById(inputDTO.id);
    if (!quest) {
      throw new HttpError("指定したidのクエストが存在しません", 400);
    }

    const updatedQuest = await questModel.updateWithTx({
      id: inputDTO.id,
      title: inputDTO.title,
      description: inputDTO.description,
      startsAt: inputDTO.startsAt,
      state: inputDTO.state,
      minutes: inputDTO.minutes,
      tagId: inputDTO.tagId,
      difficulty: inputDTO.difficulty,
      days: inputDTO.days,
      userId: inputDTO.userId,
      tx,
    });

    return {
      id: updatedQuest.id,
      title: updatedQuest.title,
      description: updatedQuest.description,
      startsAt: updatedQuest.startsAt,
      startedAt: updatedQuest.startedAt,
      minutes: updatedQuest.minutes,
      tagId: updatedQuest.tagId,
      difficulty: updatedQuest.difficulty,
      state: updatedQuest.state,
      isSucceeded: updatedQuest.isSucceeded,
      continuationLevel: updatedQuest.continuationLevel,
      days: updatedQuest.days,
      weeklyFrequency: updatedQuest.weeklyFrequency,
      weeklyCompletionCount: updatedQuest.weeklyCompletionCount,
      totalCompletionCount: updatedQuest.totalCompletionCount,
    };
  });
};
