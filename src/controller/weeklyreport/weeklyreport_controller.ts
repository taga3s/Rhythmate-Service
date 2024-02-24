import { Request, Response } from "express";
import {
GetWeeklyReportResponse 
} from "./response";
import { verifyToken } from "../../utils/jwt";
import { getWeeklyReportService } from "../../service/weeklyreport/get_weekly_report_service";
import { CustomError } from "../../pkg/customError";
import { JwtPayload } from "jsonwebtoken";
import { WeeklyReport } from "../../model/weeklyreport/types";

// ユーザの所持するすべての週次レポートを取得
export const getWeeklyReportController = async (req: Request, res: Response) => {
  const decoded = verifyToken(req.cookies.access_token) as JwtPayload;

  try {
    const outputDTO = await getWeeklyReportService(decoded.userId);
    const response: GetWeeklyReportResponse = {
      status: "ok",
      weeklyReports: outputDTO.weeklyReports?.map((weeklyReport: WeeklyReport) => {
        return {
          id: weeklyReport.id,
          completed_quests: weeklyReport.completedQuests,
          failed_quests: weeklyReport.failedQuests,
          completed_percentage: weeklyReport.completedPercentage,
          completed_days: weeklyReport.completedDays,
          completed_quests_each_day: weeklyReport.completedQuestsEachDay,
          start_date: weeklyReport.startDate,
          end_date: weeklyReport.endDate,
          user_id: weeklyReport.userId,
        };
      }),
    };
    return res.status(200).json(response);
  } catch (err) {
    if (err instanceof CustomError) {
      return res.status(err.statusCode).json({ status: "error", message: err.message });
    }
    return res.status(500).json({ status: "error", message: "Internal server error." });
  }
}
