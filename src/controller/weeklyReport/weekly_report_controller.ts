import { Request, Response } from "express";
import {
  ListWeeklyReportResponse,
  GenerateWeeklyReportFeedBackResponse,
  GetWeeklyReportFeedBackResponse,
} from "./response";
import { getUserIdFromToken } from "../../pkg/jwt/jwt";
import { HttpError } from "../../utils/httpError";
import { WeeklyReport } from "../../model/weeklyReport/types";
import { listWeeklyReportsService } from "../../service/weeklyReport/list_weekly_reports_service";
import { generateWeeklyReportFeedBackService } from "../../service/weeklyReport";
import { getWeeklyReportFeedBackService } from "../../service/weeklyReport/get_weekly_report_feedback_service";

// ユーザの所持するすべての週次レポートを取得
export const listWeeklyReportController = async (req: Request, res: Response) => {
  const userId = getUserIdFromToken(req.cookies.access_token);

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
          streak_days: weeklyReport.streakDays,
          completed_quests_each_day: weeklyReport.completedQuestsEachDay,
          failed_quests_each_day: weeklyReport.failedQuestsEachDay,
          start_date: weeklyReport.startDate,
          end_date: weeklyReport.endDate,
          user_id: weeklyReport.userId,
          feedback: weeklyReport.feedBack,
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
    return res.status(200).json(response);
  } catch (err) {
    if (err instanceof HttpError) {
      return res.status(err.statusCode).json({ status: "error", message: err.message });
    }
    return res.status(500).json({ status: "error", message: "Internal server error." });
  }
};

// 週次レポートの要約を取得
export const getWeeklyReportFeedBackController = async (req: Request<{ weeklyReportId: string }>, res: Response) => {
  const weeklyReportId = req.params.weeklyReportId;
  try {
    const summary = await getWeeklyReportFeedBackService({ weeklyReportId: weeklyReportId });

    const response: GetWeeklyReportFeedBackResponse = {
      status: "ok",
      feedBack: summary,
    };
    return res.status(200).json(response);
  } catch (err) {
    if (err instanceof HttpError) {
      return res.status(err.statusCode).json({ status: "error", message: err.message });
    }
    return res.status(500).json({ status: "error", message: "Internal server error." });
  }
};
