import { weeklyReportModel } from "../../model/weeklyReport/weekly_report_model";
import { CustomError } from "../../pkg/customError";

export const listWeeklyReportsService = async (inputDTO: {
  userId: string;
}) => {
  const model = weeklyReportModel;
  const weeklyReports = await model.listByUserId(inputDTO.userId);
  if (!weeklyReports) {
    throw new CustomError("週次レポートが見つかりませんでした", 400);
  }
  return {
    weeklyReports: weeklyReports,
  };
};
