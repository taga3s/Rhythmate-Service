import { weeklyReportModel } from "../../model/weeklyreport/weekly_report_model";
import { CustomError } from "../../pkg/customError";

export const getWeeklyReportService = async (inputDTO: {
  userId: string;
}) => {
  const model = weeklyReportModel;

  const weeklyReports = await model.getByUserId(inputDTO.userId);
  if (weeklyReports === null) {
    throw new CustomError('週次レポートが見つかりませんでした', 500);
  }
  return {
    weeklyReports: weeklyReports
  };
};

