import { userModel } from "../../model/user/user_model";
import { questModel } from "../../model/quest/quest_model";
import { weeklyReportModel } from "../../model/weeklyReport/weekly_report_model";
import { HttpError } from "../../pkg/httpError";

const getQuestExp = (difficulty: string, continuationLevel: number) => {
  const baseExp = difficulty === "EASY" ? 10 : difficulty === "NORMAL" ? 20 : difficulty === "HARD" ? 30 : 0;
  return baseExp * continuationLevel;
};

type InputDTO = { id: string; userId: string };

export const finishQuestService = async (inputDTO: InputDTO) => {
  const model = questModel;
  const quest = await model.getById(inputDTO.id);
  if (!quest) {
    throw new HttpError("指定したidのクエストが存在しません", 400);
  }
  if (quest.state === "ACTIVE") {
    throw new HttpError("すでに終了したクエストです", 400);
  }
  const finishedQuest = await model.finishById(inputDTO.id, quest.continuationLevel);
  if (!finishedQuest) {
    throw new HttpError("クエストの完了に失敗しました", 500);
  }
  //完了したクエスト数とその日の完了クエスト数をインクリメント
  const weeklyReport = await weeklyReportModel.updateByUserId(finishedQuest.userId, 1, 0, 0, 1);
  if (!weeklyReport) {
    throw new HttpError("週報の更新に失敗しました", 500);
  }
  //クエストの獲得経験値を計算
  const expIncrement = getQuestExp(finishedQuest.difficulty, finishedQuest.continuationLevel);
  //ユーザーの経験値とレベルを更新
  const updatedUser = await userModel.updateExp(finishedQuest.userId, expIncrement);
  if (!updatedUser) {
    throw new HttpError("ユーザーの経験値の更新に失敗しました", 500);
  }
  return {
    id: finishedQuest.id,
    title: finishedQuest.title,
    description: finishedQuest.description,
    startsAt: finishedQuest.startsAt,
    startedAt: finishedQuest.startedAt,
    minutes: finishedQuest.minutes,
    tagId: finishedQuest.tagId,
    difficulty: finishedQuest.difficulty,
    state: finishedQuest.state,
    isSucceeded: finishedQuest.isSucceeded,
    continuationLevel: finishedQuest.continuationLevel,
    startDate: finishedQuest.startDate,
    endDate: finishedQuest.endDate,
    dates: finishedQuest.dates,
    weeklyFrequency: finishedQuest.weeklyFrequency,
    weeklyCompletionCount: finishedQuest.weeklyCompletionCount,
    totalCompletionCount: finishedQuest.totalCompletionCount,
  };
};
