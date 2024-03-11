import { Request, Response } from "express";
import { ListWeeklyReportResponse, SummarizeWeeklyReportResponse } from "./response";
import { getUserIdFromToken } from "../../core/jwt";
import { HttpError } from "../../pkg/httpError";
import { WeeklyReport } from "../../model/weeklyReport/types";
import { listWeeklyReportsService } from "../../service/weeklyReport/list_weekly_reports_service";
import { GoogleGenerativeAI } from "@google/generative-ai";
import "dotenv/config";

const runGemini = async (weeklyReportsList: { weeklyReports: WeeklyReport[] }) => {
  const genAI = new GoogleGenerativeAI(process.env.GENERATIVE_AI_API_KEY as string);
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const prompt = `
    # 目的
    以下のデータはルーティンの実施状況をまとめた週次レポートです。
    先週の結果を踏まえて、今週の結果のいいところ、悪いところをまとめ、次週の目標を立ててください。

    # 週次レポート
    ## 先週の結果
    - 完了したルーティン数: ${weeklyReportsList.weeklyReports[0].completedQuests}
    - 失敗したルーティン数: ${weeklyReportsList.weeklyReports[0].failedQuests}
    - 完了率: ${weeklyReportsList.weeklyReports[0].completedPercentage}%
    - 完了日数: ${weeklyReportsList.weeklyReports[0].completedDays}
    - 各日の完了ルーティン数: ${weeklyReportsList.weeklyReports[0].completedQuestsEachDay}

    ## 今週の結果
    - 完了したルーティン数: ${weeklyReportsList.weeklyReports[1].completedQuests}
    - 失敗したルーティン数: ${weeklyReportsList.weeklyReports[1].failedQuests}
    - 完了率: ${weeklyReportsList.weeklyReports[1].completedPercentage}%
    - 完了日数: ${weeklyReportsList.weeklyReports[1].completedDays}
    - 各日の完了ルーティン数: ${weeklyReportsList.weeklyReports[1].completedQuestsEachDay}
  `;
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const summary = response.text();
  return summary;
};

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
    if (err instanceof HttpError) {
      return res.status(err.statusCode).json({ status: "error", message: err.message });
    }
    return res.status(500).json({ status: "error", message: "Internal server error." });
  }
};

export const summarizeWeeklyReportController = async (req: Request, res: Response) => {
  const userId = getUserIdFromToken(req.cookies.access_token);

  try {
    const weeklyReportsList = await listWeeklyReportsService({ userId: userId });
    const summary = await runGemini(weeklyReportsList);

    const response: SummarizeWeeklyReportResponse = {
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
