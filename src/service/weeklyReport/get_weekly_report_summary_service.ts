import { GoogleGenerativeAI } from "@google/generative-ai";
import { WeeklyReportModel } from "../../model/weeklyReport/weekly_report_model";
import { HttpError } from "../../pkg/httpError";
import { WeeklyReport } from "@prisma/client";
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

    ## 今週の結果
    - 完了したルーティン数: ${weeklyReports[latestIndex].completedQuests}
    - 失敗したルーティン数: ${weeklyReports[latestIndex].failedQuests}
    - 完了率: ${weeklyReports[latestIndex].completedPercentage}%
    - 完了日数: ${weeklyReports[latestIndex].completedDays}
    - 各日の完了ルーティン数: ${weeklyReports[latestIndex].completedQuestsEachDay}
  `;
  const result = await model.generateContent(prompt);
  const response = result.response;
  const summary = response.text();
  return summary;
};

export const getWeeklyReportSummaryService = async (inputDTO: {
  userId: string;
}) => {
  const model = new WeeklyReportModel();
  const weeklyReports = await model.listByUserId(inputDTO.userId);
  if (!weeklyReports) {
    throw new HttpError("週次レポートが見つかりませんでした", 400);
  } else if (weeklyReports.length < 2) {
    throw new HttpError("先週の週次レポートが見つかりませんでした", 400);
  }
  const lastWeekSummary = weeklyReports[1].summary;
  // summaryが空文字でない場合はそれを返す
  if (lastWeekSummary !== "") {
    return lastWeekSummary;
  }
  // summaryが空文字の場合は要約を生成し、DBに保存する
  else {
    const summary = await runGemini(weeklyReports);
    await model.saveSummary(inputDTO.userId, summary);
    return summary;
  }
};
