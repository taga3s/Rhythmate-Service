import { prisma } from "../../db/db";
import { getStartAndEndUTCDateTime } from "../../funcs/datetime";
import { WeeklyReportModel } from "../../model/weeklyReport/weekly_report_model";
import { HttpError } from "../../pkg/httpError";

export const createWeeklyReportService = async (inputDTO: {
  completedQuests: number;
  failedQuests: number;
  streakDays: number;
  completedQuestsEachDay: number[];
  failedQuestsEachDay: number[];
  userId: string;
}) => {
  return prisma.$transaction(async (tx) => {
    const model = new WeeklyReportModel();
    const { startUTC: startDate, endUTC: endDate } = getStartAndEndUTCDateTime();

    const weeklyReport = await model.createWithTx({
      completedQuests: inputDTO.completedQuests,
      failedQuests: inputDTO.failedQuests,
      streakDays: inputDTO.streakDays,
      completedQuestsEachDay: inputDTO.completedQuestsEachDay,
      failedQuestsEachDay: inputDTO.failedQuestsEachDay,
      startDate,
      endDate,
      userId: inputDTO.userId,
      tx,
    });
    if (!weeklyReport) {
      throw new HttpError("週次レポートの作成に失敗しました", 500);
    }

    return {
      id: weeklyReport.id,
      completedQuests: weeklyReport.completedQuests,
      failedQuests: weeklyReport.failedQuests,
      completedPercentage: weeklyReport.completedPercentage,
      streakDays: weeklyReport.streakDays,
      completedQuestsEachDay: weeklyReport.completedQuestsEachDay,
      failedQuestsEachDay: weeklyReport.failedQuestsEachDay,
      startDate: weeklyReport.startDate,
      endDate: weeklyReport.endDate,
      userId: weeklyReport.userId,
    };
  });
};
