import { prisma } from "../../db/db";
import { WeeklyReportModel } from "../../model/weeklyReport/weekly_report_model";
import { HttpError } from "../../pkg/httpError";

export const updateWeeklyReportService = async (inputDTO: {
  id: string;
  completedQuests: number;
  failedQuests: number;
  streakDays: number;
  completedQuestsEachDay: number[];
  failedQuestsEachDay: number[];
  startDate: string;
  endDate: string;
  userId: string;
}) => {
  return prisma.$transaction(async (tx) => {
    const model = new WeeklyReportModel();

    const weeklyReport = await model.getById({
      id: inputDTO.id,
    });
    if (weeklyReport === null) {
      throw new HttpError("週次レポートが見つかりませんでした", 500);
    }

    const updatedWeeklyReport = await model.updateWithTx({
      completedQuests: inputDTO.completedQuests,
      failedQuests: inputDTO.failedQuests,
      streakDays: inputDTO.streakDays,
      completedQuestsEachDay: inputDTO.completedQuestsEachDay,
      failedQuestsEachDay: inputDTO.failedQuestsEachDay,
      startDate: inputDTO.startDate,
      endDate: inputDTO.endDate,
      userId: inputDTO.userId,
      tx,
    });

    return {
      id: updatedWeeklyReport.id,
      completedQuests: updatedWeeklyReport.completedQuests,
      failedQuests: updatedWeeklyReport.failedQuests,
      completedPercentage: updatedWeeklyReport.completedPercentage,
      streakDays: updatedWeeklyReport.streakDays,
      completedQuestsEachDay: updatedWeeklyReport.completedQuestsEachDay,
      failedQuestsEachDay: updatedWeeklyReport.failedQuestsEachDay,
      startDate: updatedWeeklyReport.startDate,
      endDate: updatedWeeklyReport.endDate,
      userId: updatedWeeklyReport.userId,
    };
  });
};
