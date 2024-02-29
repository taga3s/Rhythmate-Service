import { questModel } from "../../model/quest/quest_model";
import { weeklyReportModel } from "../../model/weeklyReport/weekly_report_model";
import { HttpError } from "../../pkg/httpError";

type InputDTO = { id: string };

export const forceFinishQuestService = async (inputDTO: InputDTO) => {
  const model = questModel;
  const quest = await model.getById(inputDTO.id);
  if (!quest) {
    throw new HttpError("指定したidのクエストが存在しません", 400);
  }
  const forceFinishedQuest = await model.forceFinishById(inputDTO.id);
  if (!forceFinishedQuest) {
    throw new HttpError("クエストの完了に失敗しました", 500);
  }
  //失敗したクエスト数をインクリメント
  const weeklyReport = await weeklyReportModel.updateByUserId(forceFinishedQuest.userId, 0, 1, 0, 0);
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
