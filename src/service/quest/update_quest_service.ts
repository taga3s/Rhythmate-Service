import { prisma } from "../../db/db";
import { QuestModel } from "../../model/quest/quest_model";
import { HttpError } from "../../pkg/httpError";

type InputDTO = {
  id: string;
  title: string;
  description: string;
  startsAt: string;
  startedAt: string;
  minutes: number;
  tagId: string;
  difficulty: string;
  state: string;
  isSucceeded: boolean;
  continuationLevel: number;
  startDate: string;
  endDate: string;
  days: string[];
  weeklyCompletionCount: number;
  totalCompletionCount: number;
  userId: string;
};

export const updateQuestService = async (inputDTO: InputDTO) => {
  return prisma.$transaction(async (tx) => {
    const questModel = new QuestModel();

    const quest = await questModel.getById(inputDTO.id);
    if (!quest) {
      throw new HttpError("指定したidのクエストが存在しません", 400);
    }

    const updatedQuest = await questModel.updateWithTx(
      inputDTO.id,
      inputDTO.title,
      inputDTO.description,
      inputDTO.startsAt,
      inputDTO.startedAt,
      inputDTO.minutes,
      inputDTO.tagId,
      inputDTO.difficulty,
      inputDTO.startedAt,
      inputDTO.isSucceeded,
      inputDTO.continuationLevel,
      inputDTO.startDate,
      inputDTO.endDate,
      inputDTO.days,
      inputDTO.weeklyCompletionCount,
      inputDTO.totalCompletionCount,
      inputDTO.userId,
      tx,
    );

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
