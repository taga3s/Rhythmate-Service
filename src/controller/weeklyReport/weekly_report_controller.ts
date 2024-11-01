import { Request, Response } from "express";
import { ListWeeklyReportResponse, GenerateWeeklyReportFeedBackResponse, toWeeklyReportBaseResponse } from "./response";
import { getUserIdFromToken } from "../../pkg/jwt/jwt";
import { HttpError } from "../../utils/httpError";
import { WeeklyReport } from "../../model/weeklyReport/types";
import { listWeeklyReportsService } from "../../service/weeklyReport/list_weekly_reports_service";
import { generateWeeklyReportFeedBackService } from "../../service/weeklyReport";

// ユーザの所持するすべての週次レポートを取得
export const listWeeklyReportController = async (req: Request, res: Response) => {
  const userId = getUserIdFromToken(req.cookies.access_token);

  try {
    const outputDTO = await listWeeklyReportsService({ userId: userId });
    const response: ListWeeklyReportResponse = {
      status: "ok",
      weeklyReports: outputDTO.weeklyReports?.map((weeklyReport: WeeklyReport) =>
        toWeeklyReportBaseResponse(weeklyReport),
      ),
    };
    res.status(200).json(response);
  } catch (err) {
    if (err instanceof HttpError) {
      res.status(err.statusCode).json({ status: "error", message: err.message });
      return;
    }
    res.status(500).json({ status: "error", message: "Internal server error." });
  }
};

// 週次レポートの要約を生成
export const generateWeeklyReportFeedBackController = async (
  req: Request<{ weeklyReportId: string }>,
  res: Response,
) => {
  const weeklyReportId = req.params.weeklyReportId;
  try {
    const outputDTO = await generateWeeklyReportFeedBackService({ weeklyReportId: weeklyReportId });
    const response: GenerateWeeklyReportFeedBackResponse = {
      status: "ok",
      feedBack: outputDTO.feedBack,
    };
    res.status(200).json(response);
  } catch (err) {
    if (err instanceof HttpError) {
      res.status(err.statusCode).json({ status: "error", message: err.message });
      return;
    }
    res.status(500).json({ status: "error", message: "Internal server error." });
  }
};
