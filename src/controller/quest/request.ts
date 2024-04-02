export type CreateQuestRequest = {
  title: string;
  description: string;
  starts_at: string;
  minutes: number;
  tag_id: string;
  difficulty: string;
  days: string[];
  state: "INACTIVE" | "ACTIVE";
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
  days: string[];
  weekly_completion_count: number;
  total_completion_count: number;
};
