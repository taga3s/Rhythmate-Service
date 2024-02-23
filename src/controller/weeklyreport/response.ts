export type CreateWeeklyReportResponse = {
  status: string;
  id: string;
  completed_quests: number;
  failed_quests: number;
  completed_percentage: number;
  completed_days: number;
  completed_quests_each_day: number[];
  start_date: Date;
  end_date: Date;
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
  start_date: Date;
  end_date: Date;
  user_id: string;
};

export type GetWeeklyReportResponse = {
  status: string;
  weeklyReports: {
    id: string;
    completed_quests: number;
    failed_quests: number;
    completed_percentage: number;
    completed_days: number;
    completed_quests_each_day: number[];
    start_date: Date;
    end_date: Date;
    user_id: string;
  }[];
};

export type DeleteWeeklyReportResponse = {
  status: string;
};