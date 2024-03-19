import { prisma } from "../../db/db";
import { WeeklyReportModel } from "../../model/weeklyReport/weekly_report_model";
import { HttpError } from "../../pkg/httpError";

export const deleteWeeklyReportService = async (inputDTO: { id: string }) => {
  return prisma.$transaction(async (tx) => {
    const model = new WeeklyReportModel();

    const weeklyReport = await model.getById(inputDTO.id);
    if (weeklyReport === null) {
      throw new HttpError("週次レポートが見つかりませんでした", 500);
    }

    const result = await model.deleteByIdWithTx(inputDTO.id, tx);
    if (result === null) {
      throw new HttpError("週次レポートの削除に失敗しました", 500);
    }
  });
};
