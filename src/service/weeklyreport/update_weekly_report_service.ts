import { weeklyReportModel } from "../../model/weeklyreport/weekly_report_model";
import { CustomError } from "../../pkg/customError";

export const updateWeeklyReportService = async (inputDTO: {
  id: string;
  completedQuests: number;
  failedQuests: number;
  completedDays: number;
  completedQuestsEachDay: number[];
  startDate: string;
  endDate: string;
  userId: string;
}) => {
  const model = weeklyReportModel;

  const weeklyReport = await model.getById(inputDTO.id);
  if (weeklyReport === null) {
    throw new CustomError("週次レポートが見つかりませんでした", 500);
  }
  const updatedWeeklyReport = await model.update(
    inputDTO.completedQuests,
    inputDTO.failedQuests,
    inputDTO.completedDays,
    inputDTO.completedQuestsEachDay,
    inputDTO.startDate,
    inputDTO.endDate,
    inputDTO.userId,
  );

  return {
    id: updatedWeeklyReport.id,
    completedQuests: updatedWeeklyReport.completedQuests,
    failedQuests: updatedWeeklyReport.failedQuests,
    completedPercentage: updatedWeeklyReport.completedPercentage,
    completedDays: updatedWeeklyReport.completedDays,
    completedQuestsEachDay: updatedWeeklyReport.completedQuestsEachDay,
    startDate: updatedWeeklyReport.startDate,
    endDate: updatedWeeklyReport.endDate,
    userId: updatedWeeklyReport.userId,
  };
};
