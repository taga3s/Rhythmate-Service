import { weeklyReportModel } from "../../model/weeklyReport/weekly_report_model";
import { HttpError } from "../../pkg/httpError";

export const deleteWeeklyReportService = async (inputDTO: {
  id: string;
}) => {
  const model = weeklyReportModel;
  const weeklyReport = await model.getById(inputDTO.id);
  if (weeklyReport === null) {
    throw new HttpError("週次レポートが見つかりませんでした", 500);
  }
  const result = await model.deleteById(inputDTO.id);
  if (result === null) {
    throw new HttpError("週次レポートの削除に失敗しました", 500);
  }
};
