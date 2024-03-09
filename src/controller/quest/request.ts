export type CreateQuestRequest = {
  title: string;
  description: string;
  starts_at: string;
  minutes: number;
  tag_id: string;
  difficulty: string;
  days: string[];
};

export type UpdateQuestRequest = {
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
  start_date: string;
  end_date: string;
  days: string[];
  weekly_completion_count: number;
  total_completion_count: number;
};
