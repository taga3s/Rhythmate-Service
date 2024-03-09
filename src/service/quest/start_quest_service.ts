import { QuestModel } from "../../model/quest/quest_model";
import { HttpError } from "../../pkg/httpError";

type inputDTO = { id: string };

export const startQuestService = async (inputDTO: inputDTO) => {
  const questModel = new QuestModel();
  const quest = await questModel.getById(inputDTO.id);
  if (!quest) {
    throw new HttpError("指定したidのクエストが存在しません", 400);
  }
  if (quest.startedAt !== "NOT_STARTED_YET") {
    throw new HttpError("すでに開始しているクエストです", 500);
  }
  const startedQuest = await questModel.startById(inputDTO.id);
  if (!startedQuest) {
    throw new HttpError("クエストの開始に失敗しました", 500);
  }
  return {
    id: startedQuest.id,
    title: startedQuest.title,
    description: startedQuest.description,
    startsAt: startedQuest.startsAt,
    startedAt: startedQuest.startedAt,
    minutes: startedQuest.minutes,
    tagId: startedQuest.tagId,
    difficulty: startedQuest.difficulty,
    state: startedQuest.state,
    isSucceeded: startedQuest.isSucceeded,
    continuationLevel: startedQuest.continuationLevel,
    startDate: startedQuest.startDate,
    endDate: startedQuest.endDate,
    dates: startedQuest.dates,
    weeklyFrequency: startedQuest.weeklyFrequency,
    weeklyCompletionCount: startedQuest.weeklyCompletionCount,
    totalCompletionCount: startedQuest.totalCompletionCount,
  };
};
