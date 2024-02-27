import { weeklyReportModel } from "../../model/weeklyreport/weekly_report_model";
import { CustomError } from "../../pkg/customError";

export const createWeeklyReportService = async (inputDTO: {
  completedQuests: number;
  failedQuests: number;
  completedDays: number;
  completedQuestsEachDay: number[];
  startDate: Date;
  endDate: Date;
  userId: string;
}) => {
  const model = weeklyReportModel;

  const weeklyReport = await model.create(
    inputDTO.completedQuests,
    inputDTO.failedQuests,
    inputDTO.completedDays,
    inputDTO.completedQuestsEachDay,
    inputDTO.userId,
  );
  if (weeklyReport === null) {
    throw new CustomError("週次レポートの作成に失敗しました", 500);
  }

  return {
    id: weeklyReport.id,
    completedQuests: weeklyReport.completedQuests,
    failedQuests: weeklyReport.failedQuests,
    completedPercentage: weeklyReport.completedPercentage,
    completedDays: weeklyReport.completedDays,
    completedQuestsEachDay: weeklyReport.completedQuestsEachDay,
    startDate: weeklyReport.startDate,
    endDate: weeklyReport.endDate,
    userId: weeklyReport.userId,
  };
};
