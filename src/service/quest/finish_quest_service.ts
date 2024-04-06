import { prisma } from "../../db/db";
import { QuestModel } from "../../model/quest/quest_model";
import { UserModel } from "../../model/user/user_model";
import { WeeklyReportModel } from "../../model/weeklyReport/weekly_report_model";
import { HttpError } from "../../pkg/httpError";
import { levelCheckService } from "../badge/check-achievements/level_check_service";
import { totalQuestsCheckService } from "../badge/check-achievements/total_quests_check";

const getQuestExp = (difficulty: string, continuationLevel: number) => {
  const baseExp = difficulty === "EASY" ? 10 : difficulty === "NORMAL" ? 20 : difficulty === "HARD" ? 30 : 0;
  return baseExp * continuationLevel;
};

type InputDTO = { id: string; userId: string };

export const finishQuestService = async (inputDTO: InputDTO) => {
  return prisma.$transaction(async (tx) => {
    const questModel = new QuestModel();
    const userModel = new UserModel();
    const weeklyReportModel = new WeeklyReportModel();

    const quest = await questModel.getById(inputDTO.id);
    if (!quest) {
      throw new HttpError("指定したidのクエストが存在しません", 400);
    }
    if (quest.state === "ACTIVE") {
      throw new HttpError("すでに終了したクエストです", 400);
    }

    const finishedQuest = await questModel.finishByIdWithTx(inputDTO.id, quest.continuationLevel, tx);
    if (!finishedQuest) {
      throw new HttpError("クエストの完了に失敗しました", 500);
    }

    // 週次レポートの更新
    const targetWeeklyReport = await weeklyReportModel.getByUserId(quest.userId);
    if (!targetWeeklyReport) {
      throw new HttpError("指定したuserIdの週報が存在しません", 400);
    }

    const completedQuestsIncrements = 1;
    const weekDaysLength = 7;

    const completedQuests = targetWeeklyReport.completedQuests + completedQuestsIncrements;
    const failedQuests = targetWeeklyReport.failedQuests;
    const completedDays = targetWeeklyReport.completedDays;
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
    const addedCompletedQuestsEachDay = completedQuestsEachDay.map((completedQuestsEachDay, i) =>
      i === todayIndex ? completedQuestsEachDay + completedQuestsIncrements : completedQuestsEachDay,
    );

    const weeklyReport = await weeklyReportModel.updateByIdWithTx(
      targetWeeklyReport.id,
      completedQuests,
      failedQuests,
      completedDays,
      addedCompletedQuestsEachDay,
      failedQuestsEachDay,
      completedPercentage,
      tx,
    );
    if (!weeklyReport) {
      throw new HttpError("週報の更新に失敗しました", 500);
    }

    //ユーザーの経験値とレベルを更新
    const user = await userModel.getById(quest.userId);
    if (!user) {
      throw new HttpError("ユーザーが見つかりません", 400);
    }

    const expIncrement = getQuestExp(quest.difficulty, quest.continuationLevel);
    const updatedUser = await userModel.updateExpWithTx(user.id, user.exp, expIncrement, tx);
    if (!updatedUser) {
      throw new HttpError("ユーザーの経験値の更新に失敗しました", 500);
    }

    // バッジ獲得条件(レベルチェックサービス・累計クエスト数チェックサービスの注入）
    await levelCheckService({ userId: updatedUser.id, level: updatedUser.level }, tx);

    const targetWeeklyReports = await weeklyReportModel.listByUserId(quest.userId);
    const totalQuestsNum = targetWeeklyReports.reduce((acc, weeklyReport) => acc + weeklyReport.completedQuests, 1);
    await totalQuestsCheckService({ userId: updatedUser.id, totalQuestsNum: totalQuestsNum }, tx);

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
      days: finishedQuest.days,
      weeklyFrequency: finishedQuest.weeklyFrequency,
      weeklyCompletionCount: finishedQuest.weeklyCompletionCount,
      totalCompletionCount: finishedQuest.totalCompletionCount,
    };
  });
};
