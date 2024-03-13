import { QuestModel } from "../../model/quest/quest_model";
import { WeeklyReportModel } from "../../model/weeklyReport/weekly_report_model";
import { HttpError } from "../../pkg/httpError";

type InputDTO = { id: string };

export const forceFinishQuestService = async (inputDTO: InputDTO) => {
  const weeklyReportModel = new WeeklyReportModel();
  const questModel = new QuestModel();
  const quest = await questModel.getById(inputDTO.id);
  if (!quest) {
    throw new HttpError("指定したidのクエストが存在しません", 400);
  }
  const forceFinishedQuest = await questModel.forceFinishById(inputDTO.id);
  if (!forceFinishedQuest) {
    throw new HttpError("クエストの完了に失敗しました", 500);
  }
  const targetWeeklyReport = await weeklyReportModel.getByUserId(forceFinishedQuest.userId);
  if (!targetWeeklyReport) {
    throw new HttpError("指定したuserIdの週報が存在しません", 400);
  }

  //失敗したクエスト数をインクリメント
  const weeklyReport = await weeklyReportModel.updateById(
    forceFinishedQuest.id,
    0,
    1,
    0,
    targetWeeklyReport.completedQuestsEachDay,
  );
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
    days: forceFinishedQuest.days,
    weeklyFrequency: forceFinishedQuest.weeklyFrequency,
    weeklyCompletionCount: forceFinishedQuest.weeklyCompletionCount,
    totalCompletionCount: forceFinishedQuest.totalCompletionCount,
  };
};
