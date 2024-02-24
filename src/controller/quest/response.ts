export type CreateQuestResponse = {
  status: string;
  title: string;
  description: string;
  starts_at: string;
  started_at: string;
  minutes: number;
  tag_id: string;
  difficulty: string;
  state: string;
  is_succeeded: boolean;
  start_date: Date;
  end_date: Date;
  dates: string[];
  weekly_frequency: number;
};

export type UpdateQuestResponse = {
  status: string;
  id: string;
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
  weekly_frequency: number;
  weekly_completion_count: number;
  total_completion_count: number;
};

export type DeleteQuestResponse = {
  status: string;
};

export type GetQuestResponse = {
  status: string;
  quests: {
    id: string;
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
    weekly_frequency: number;
    weekly_completion_count: number;
    total_completion_count: number;
  }[];
};

export type StartQuestResponse = {
  status: string;
  id: string;
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
  weekly_frequency: number;
  weekly_completion_count: number;
  total_completion_count: number;
};

export type FinishQuestResponse = {
  status: string;
  id: string;
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
  weekly_frequency: number;
  weekly_completion_count: number;
  total_completion_count: number;
};
