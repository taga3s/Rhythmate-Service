import { GoogleGenerativeAI } from "@google/generative-ai";
import { WeeklyReportModel } from "../../model/weeklyReport/weekly_report_model";
import { HttpError } from "../../pkg/httpError";
import { WeeklyReport } from "@prisma/client";
import "dotenv/config";

const runGemini = async (weeklyReports: WeeklyReport[]) => {
  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY as string);
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const prompt = `
    # 目的
    あなたはルーティン化達成アドバイザーです。
    先週と今週の達成状況を比較し、５０文字程度でアドバイスしてください。
    また、返答にはマークダウン記法や改行は使用しないでください。

    # 週次レポート
    ## 先週の結果
    - 完了したルーティン数: ${weeklyReports[1].completedQuests}
    - 失敗したルーティン数: ${weeklyReports[1].failedQuests}
    - 完了率: ${weeklyReports[1].completedPercentage}%
    - 完了日数: ${weeklyReports[1].completedDays}
    - 各日の完了ルーティン数: ${weeklyReports[1].completedQuestsEachDay}

    ## 今週の結果
    - 完了したルーティン数: ${weeklyReports[0].completedQuests}
    - 失敗したルーティン数: ${weeklyReports[0].failedQuests}
    - 完了率: ${weeklyReports[0].completedPercentage}%
    - 完了日数: ${weeklyReports[0].completedDays}
    - 各日の完了ルーティン数: ${weeklyReports[0].completedQuestsEachDay}
  `;
  const result = await model.generateContent(prompt);
  const response = result.response;
  const summary = response.text();
  return summary;
};

export const getWeeklyReportSummaryService = async (inputDTO: {
  userId: string;
  weeklyReportIndex: number;
}) => {
  const model = new WeeklyReportModel();
  const weeklyReports = await model.listByUserId(inputDTO.userId);
  if (!weeklyReports) {
    throw new HttpError("週次レポートが見つかりませんでした", 400);
  }

  const thisWeekReport = weeklyReports[inputDTO.weeklyReportIndex]; // 今週の週次レポート
  const lastWeekReport = weeklyReports[inputDTO.weeklyReportIndex + 1]; // 先週の週次レポート

  // summaryが空文字でない場合はそれを返す
  if (thisWeekReport.summary !== "") {
    return thisWeekReport.summary;
  }
  // 最初の週の場合
  else if (lastWeekReport === undefined) {
    const firstSummary = "最初の１週間お疲れさまでした！来週以降アドバイスが生成されます！";
    await model.saveSummary(thisWeekReport.id, firstSummary);
    return firstSummary;
  }
  // summaryが空文字の場合は要約を生成し、DBに保存する
  else {
    const summary = await runGemini([thisWeekReport, lastWeekReport]);
    await model.saveSummary(thisWeekReport.id, summary);
    return summary;
  }
};
