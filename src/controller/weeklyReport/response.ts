export type CreateWeeklyReportResponse = {
  status: string;
  id: string;
  completed_quests: number;
  failed_quests: number;
  completed_percentage: number;
  completed_days: number;
  completed_quests_each_day: number[];
  failed_quests_each_day: number[];
  start_date: string;
  end_date: string;
  user_id: string;
};

export type UpdateWeeklyReportResponse = {
  status: string;
  id: string;
  completed_quests: number;
  failed_quests: number;
  completed_percentage: number;
  completed_days: number;
  completed_quests_each_day: number[];
  failed_quests_each_day: number[];
  start_date: string;
  end_date: string;
  user_id: string;
};

export type ListWeeklyReportResponse = {
  status: string;
  weeklyReports: {
    id: string;
    completed_quests: number;
    failed_quests: number;
    completed_percentage: number;
    completed_days: number;
    completed_quests_each_day: number[];
    failed_quests_each_day: number[];
    start_date: string;
    end_date: string;
    user_id: string;
  }[];
};

export type DeleteWeeklyReportResponse = {
  status: string;
};

export type GenerateWeeklyReportFeedBackResponse = {
  status: string;
};

export type GetWeeklyReportFeedBackResponse = {
  status: string;
  feedBack: string;
};
