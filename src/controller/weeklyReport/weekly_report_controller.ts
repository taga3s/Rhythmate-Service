import { Request, Response } from "express";
import { ListWeeklyReportResponse, SummarizeWeeklyReportResponse } from "./response";
import { getUserIdFromToken } from "../../core/jwt";
import { HttpError } from "../../pkg/httpError";
import { WeeklyReport } from "../../model/weeklyReport/types";
import { listWeeklyReportsService } from "../../service/weeklyReport/list_weekly_reports_service";
import { GoogleGenerativeAI } from "@google/generative-ai";
import "dotenv/config";

const runGemini = async (weeklyReports: WeeklyReport[]) => {
  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY as string);
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const latestIndex = weeklyReports.length - 1;
  const prompt = `
    # 目的
    あなたはルーティン化達成アドバイザーです。
    先週と今週の達成状況を比較し、良い点、悪い点について５０文字程度でアドバイスしてください。
    また、返答にはマークダウン記法や改行は使用しないでください。

    # 週次レポート
    ## 先週の結果
    - 完了したルーティン数: ${weeklyReports[latestIndex - 1].completedQuests}
    - 失敗したルーティン数: ${weeklyReports[latestIndex - 1].failedQuests}
    - 完了率: ${weeklyReports[latestIndex - 1].completedPercentage}%
    - 完了日数: ${weeklyReports[latestIndex - 1].completedDays}
    - 各日の完了ルーティン数: ${weeklyReports[latestIndex - 1].completedQuestsEachDay}
    // - 開始日: ${weeklyReports[latestIndex - 1].startDate}
    // - 終了日: ${weeklyReports[latestIndex - 1].endDate}

    ## 今週の結果
    - 完了したルーティン数: ${weeklyReports[latestIndex].completedQuests}
    - 失敗したルーティン数: ${weeklyReports[latestIndex].failedQuests}
    - 完了率: ${weeklyReports[latestIndex].completedPercentage}%
    - 完了日数: ${weeklyReports[latestIndex].completedDays}
    - 各日の完了ルーティン数: ${weeklyReports[latestIndex].completedQuestsEachDay}
    // - 開始日: ${weeklyReports[latestIndex].startDate}
    // - 終了日: ${weeklyReports[latestIndex].endDate}
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

// 週次レポートを要約
export const summarizeWeeklyReportController = async (req: Request, res: Response) => {
  const userId = getUserIdFromToken(req.cookies.access_token);

  try {
    const weeklyReportsList = await listWeeklyReportsService({ userId: userId });
    const summary = await runGemini(weeklyReportsList.weeklyReports);

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
