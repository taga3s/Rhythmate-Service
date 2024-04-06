import { Request, Response } from "express";
import { ListWeeklyReportResponse, GetWeeklyReportSummaryResponse } from "./response";
import { getUserIdFromToken } from "../../core/jwt";
import { HttpError } from "../../pkg/httpError";
import { WeeklyReport } from "../../model/weeklyReport/types";
import { listWeeklyReportsService } from "../../service/weeklyReport/list_weekly_reports_service";
import { getWeeklyReportSummaryService } from "../../service/weeklyReport";

// ユーザの所持するすべての週次レポートを取得
export const listWeeklyReportController = async (req: Request, res: Response) => {
  const userId = getUserIdFromToken(req.session.accessToken || "");

  try {
    const outputDTO = await listWeeklyReportsService({ userId: userId });
    const response: ListWeeklyReportResponse = {
      status: "ok",
      weeklyReports: outputDTO.weeklyReports?.map((weeklyReport: WeeklyReport) => {
        return {
          id: weeklyReport.id,
          completed_quests: weeklyReport.completedQuests,
          failed_quests: weeklyReport.failedQuests,
          completed_percentage: weeklyReport.completedPercentage,
          completed_days: weeklyReport.completedDays,
          completed_quests_each_day: weeklyReport.completedQuestsEachDay,
          failed_quests_each_day: weeklyReport.failedQuestsEachDay,
          start_date: weeklyReport.startDate,
          end_date: weeklyReport.endDate,
          user_id: weeklyReport.userId,
        };
      }),
    };
    return res.status(200).json(response);
  } catch (err) {
    if (err instanceof HttpError) {
      return res.status(err.statusCode).json({ status: "error", message: err.message });
    }
    return res.status(500).json({ status: "error", message: "Internal server error." });
  }
};

// 週次レポートの要約を取得
export const getWeeklyReportSummaryController = async (req: Request<{ index: string }>, res: Response) => {
  const userId = getUserIdFromToken(req.session.accessToken || "");
  const weeklyReportIndex = Number(req.params.index);
  try {
    const summary = await getWeeklyReportSummaryService({ userId: userId, weeklyReportIndex: weeklyReportIndex });

    const response: GetWeeklyReportSummaryResponse = {
      status: "ok",
      summary: summary,
    };
    return res.status(200).json(response);
  } catch (err) {
    if (err instanceof HttpError) {
      return res.status(err.statusCode).json({ status: "error", message: err.message });
    }
    return res.status(500).json({ status: "error", message: "Internal server error." });
  }
};
