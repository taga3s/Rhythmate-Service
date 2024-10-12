import { WeeklyReportModel } from "../../model/weeklyReport/weekly_report_model";
import { HttpError } from "../../utils/httpError";

export const listWeeklyReportsService = async (inputDTO: {
  userId: string;
}) => {
  const model = new WeeklyReportModel();

  const weeklyReports = await model.listByUserId({
    userId: inputDTO.userId,
  });
  if (!weeklyReports) {
    throw new HttpError("週次レポートが見つかりませんでした", 400);
  }

  return {
    weeklyReports: weeklyReports,
  };
};
