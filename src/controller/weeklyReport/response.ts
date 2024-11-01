import * as schemaHelper from "../../pkg/schema/schemaHelper";

export type ListWeeklyReportResponse = schemaHelper.ResponseData<"/weekly-reports", "get">;

export type GetWeeklyReportFeedBackResponse = schemaHelper.ResponseData<
  "/weekly-reports/feedback/:weeklyReportId",
  "get"
>;

export type GenerateWeeklyReportFeedBackResponse = schemaHelper.ResponseData<
  "/weekly-reports/feedback/:weeklyReportId",
  "post"
>;

type WeeklyReportBaseResponse = {
  id: string;
  completed_quests: number;
  failed_quests: number;
  completed_percentage: number;
  streak_days: number;
  completed_quests_each_day: number[];
  failed_quests_each_day: number[];
  start_date: string;
  end_date: string;
  user_id: string;
  feedback: string;
};

export const toWeeklyReportBaseResponse = (obj: {
  id: string;
  completedQuests: number;
  failedQuests: number;
  completedPercentage: number;
  streakDays: number;
  completedQuestsEachDay: number[];
  failedQuestsEachDay: number[];
  startDate: string;
  endDate: string;
  userId: string;
  feedBack: string;
}): WeeklyReportBaseResponse => {
  return {
    id: obj.id,
    completed_quests: obj.completedQuests,
    failed_quests: obj.failedQuests,
    completed_percentage: obj.completedPercentage,
    streak_days: obj.streakDays,
    completed_quests_each_day: obj.completedQuestsEachDay,
    failed_quests_each_day: obj.failedQuestsEachDay,
    start_date: obj.startDate,
    end_date: obj.endDate,
    user_id: obj.userId,
    feedback: obj.feedBack,
  };
};
