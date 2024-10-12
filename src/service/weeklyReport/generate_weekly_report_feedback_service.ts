import { GoogleGenerativeAI } from "@google/generative-ai";
import { WeeklyReportModel } from "../../model/weeklyReport/weekly_report_model";
import { HttpError } from "../../pkg/httpError";
import { WeeklyReport } from "@prisma/client";
import { prisma } from "../../db/db";
import "dotenv/config";

const runGemini = async (weeklyReport: WeeklyReport) => {
  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY as string);
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const prompt = `
    # 目的
    あなたはルーティン化達成アドバイザーです。
    今週の達成状況を比較し、５０文字程度でアドバイスしてください。
    また、返答にはマークダウン記法や改行は使用しないでください。

    # 週次レポート
    - 完了したルーティン数: ${weeklyReport.completedQuests}
    - 失敗したルーティン数: ${weeklyReport.failedQuests}
    - 完了率: ${weeklyReport.completedPercentage}%
    - 連続ストリーク日数: ${weeklyReport.streakDays}
    - 各曜日の完了ルーティン数: ${weeklyReport.completedQuestsEachDay}
  `;
  const result = await model.generateContent(prompt);
  const response = result.response;
  const feedBack = response.text();
  return feedBack;
};

export const generateWeeklyReportFeedBackService = async (inputDTO: {
  weeklyReportId: string;
}) => {
  return prisma.$transaction(async (tx) => {
    const model = new WeeklyReportModel();

    const weeklyReport = await model.getById({
      id: inputDTO.weeklyReportId,
    });
    if (!weeklyReport) {
      throw new HttpError("週次レポートが見つかりませんでした", 400);
    }

    const feedBack = await runGemini(weeklyReport);
    await model.updateFeedBackByIdWithTx({
      id: inputDTO.weeklyReportId,
      feedBack: feedBack,
      tx: tx,
    });
    return { feedBack: feedBack };
  });
};
