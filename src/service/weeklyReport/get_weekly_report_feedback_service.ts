import { WeeklyReportModel } from "../../model/weeklyReport/weekly_report_model";
import { HttpError } from "../../utils/httpError";

export const getWeeklyReportFeedBackService = async (inputDTO: {
  weeklyReportId: string;
}) => {
  const model = new WeeklyReportModel();

  const weeklyReport = await model.getById({
    id: inputDTO.weeklyReportId,
  });
  if (!weeklyReport) {
    throw new HttpError("週次レポートが見つかりませんでした", 400);
  }

  const feedBack = weeklyReport.feedBack;
  return feedBack;
};
