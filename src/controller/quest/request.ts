export type CreateQuestRequest = {
  title: string;
  description: string;
  starts_at: string;
  minutes: number;
  tag_id: string;
  difficulty: string;
  dates: string[];
};

export type UpdateQuestRequest = {
  // id: string
  title: string;
  description: string;
  starts_at: string;
  started_at: string;
  minutes: number;
  tag_id: string;
  difficulty: string;
  state: string;
  is_succeeded: boolean;
  continuation_level: number;
  start_date: Date;
  end_date: Date;
  dates: string[];
  weekly_completion_count: number;
  total_completion_count: number;
};
