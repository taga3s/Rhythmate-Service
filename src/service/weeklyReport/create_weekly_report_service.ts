import { prisma } from "../../db/db";
import { getStartAndEndUTCDateTime } from "../../utils/datetime";
import { WeeklyReportModel } from "../../model/weeklyReport/weekly_report_model";
import { HttpError } from "../../utils/httpError";

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
