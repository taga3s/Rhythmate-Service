import { prisma } from "../../db/db";
import { QuestModel } from "../../model/quest/quest_model";
import { WeeklyReportModel } from "../../model/weeklyReport/weekly_report_model";
import { HttpError } from "../../pkg/httpError";

type InputDTO = { id: string };

export const forceFinishQuestService = async (inputDTO: InputDTO) => {
  return prisma.$transaction(async (tx) => {
    const weeklyReportModel = new WeeklyReportModel();
    const questModel = new QuestModel();

    const quest = await questModel.getById(inputDTO.id);
    if (!quest) {
      throw new HttpError("指定したidのクエストが存在しません", 400);
    }
    if (quest.state === "ACTIVE") {
      throw new HttpError("すでに終了したクエストです", 400);
    }

    const forceFinishedQuest = await questModel.forceFinishByIdWithTx({
      id: inputDTO.id,
      tx,
    });
    if (!forceFinishedQuest) {
      throw new HttpError("クエストの完了に失敗しました", 500);
    }

    const targetWeeklyReport = await weeklyReportModel.getByUserId(quest.userId);
    if (!targetWeeklyReport) {
      throw new HttpError("指定したuserIdの週報が存在しません", 400);
    }

    // 週次レポートの更新
    const failedQuestsIncrements = 1;
    const weekDaysLength = 7;

    const completedQuests = targetWeeklyReport.completedQuests;
    const failedQuests = targetWeeklyReport.failedQuests + failedQuestsIncrements;
    const completedDays = 0;
    const completedPercentage = Math.floor((completedQuests / (completedQuests + failedQuests)) * 100);
    const completedQuestsEachDay =
      targetWeeklyReport.completedQuestsEachDay && targetWeeklyReport.completedQuestsEachDay.length === weekDaysLength
        ? targetWeeklyReport.completedQuestsEachDay
        : [0, 0, 0, 0, 0, 0, 0];
    const failedQuestsEachDay =
      targetWeeklyReport.failedQuestsEachDay && targetWeeklyReport.failedQuestsEachDay.length === weekDaysLength
        ? targetWeeklyReport.failedQuestsEachDay
        : [0, 0, 0, 0, 0, 0, 0];

    const todayIndex = (new Date().getDay() + 6) % 7; // 0: 月曜日, 1: 火曜日...
    const addedFailedQuestsEachDay = failedQuestsEachDay.map((failedQuestsEachDay, i) =>
      i === todayIndex ? failedQuestsEachDay + failedQuestsIncrements : failedQuestsEachDay,
    );

    const weeklyReport = await weeklyReportModel.updateByIdWithTx(
      targetWeeklyReport.id,
      completedQuests,
      failedQuests,
      completedDays,
      completedQuestsEachDay,
      addedFailedQuestsEachDay,
      completedPercentage,
      tx,
    );
    if (!weeklyReport) {
      throw new HttpError("週報の更新に失敗しました", 500);
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
      days: forceFinishedQuest.days,
      weeklyFrequency: forceFinishedQuest.weeklyFrequency,
      weeklyCompletionCount: forceFinishedQuest.weeklyCompletionCount,
      totalCompletionCount: forceFinishedQuest.totalCompletionCount,
    };
  });
};
