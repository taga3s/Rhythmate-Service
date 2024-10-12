import { prisma } from "../../db/db";
import { WeeklyReportModel } from "../../model/weeklyReport/weekly_report_model";
import { HttpError } from "../../utils/httpError";

export const deleteWeeklyReportService = async (inputDTO: { id: string }) => {
  return prisma.$transaction(async (tx) => {
    const model = new WeeklyReportModel();

    const weeklyReport = await model.getById({
      id: inputDTO.id,
    });
    if (weeklyReport === null) {
      throw new HttpError("週次レポートが見つかりませんでした", 500);
    }

    const result = await model.deleteByIdWithTx({
      id: inputDTO.id,
      tx: tx,
    });
    if (result === null) {
      throw new HttpError("週次レポートの削除に失敗しました", 500);
    }
  });
};
