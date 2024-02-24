import { questModel } from "../../model/quest/quest_model";
import { CustomError } from "../../pkg/customError";
type inputDTO = { id: string };

export const forceFinishQuestService = async (inputDTO: inputDTO) => {
  const model = questModel;
  const quest = await model.getById(inputDTO.id);
  if (!quest) {
    throw new CustomError("指定したidのクエストが存在しません", 400);
  }
  const forceFinishedQuest = await model.forceFinishById(inputDTO.id);
  if (!forceFinishedQuest) {
    throw new CustomError("クエストの完了に失敗しました", 500);
  }

  return {
    id: forceFinishedQuest.id,
    title: forceFinishedQuest.title,
    description: forceFinishedQuest.description,
    startsAt: forceFinishedQuest.startsAt,
    startedAt: forceFinishedQuest.startedAt,
    minutes: forceFinishedQuest.minutes,
    tagId: forceFinishedQuest.tagId,
    difficulty: forceFinishedQuest.difficulty,
    state: forceFinishedQuest.state,
    isSucceeded: forceFinishedQuest.isSucceeded,
    continuationLevel: forceFinishedQuest.continuationLevel,
    startDate: forceFinishedQuest.startDate,
    endDate: forceFinishedQuest.endDate,
    dates: forceFinishedQuest.dates,
    weeklyFrequency: forceFinishedQuest.weeklyFrequency,
    weeklyCompletionCount: forceFinishedQuest.weeklyCompletionCount,
    totalCompletionCount: forceFinishedQuest.totalCompletionCount,
  };
};
