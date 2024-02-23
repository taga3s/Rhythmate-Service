import { weeklyReportModel } from "../../model/weeklyreport/weekly_report_model";
import { CustomError } from "../../pkg/customError";

export const deleteWeeklyReportService = async (inputDTO: {
  id: string;
}) => {
  const model = weeklyReportModel;
  const weeklyReport = await model.getById(inputDTO.id);
  if (weeklyReport === null) {
    throw new CustomError('週次レポートが見つかりませんでした', 500);
  }
  const result = await model.deleteById(inputDTO.id);
  if (result === null) {
    throw new CustomError('週次レポートの削除に失敗しました', 500);
  }
}
