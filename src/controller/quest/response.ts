export type CreateQuestResponse = {
  status: string;
  title: string;
  description: string;
  starts_at: string;
  started_at: string;
  minutes: number;
  tag_id: string;
  difficulty: string;
  is_done: boolean;
  start_date: Date;
  end_date: Date;
  dates: string[];
  weekly_frequency: number;
};

export type UpdateQuestResponse = {
  status: string;
  title: string;
  description: string;
  starts_at: string;
  started_at: string;
  minutes: number;
  tag_id: string;
  difficulty: string;
  is_done: boolean;
  start_date: Date;
  end_date: Date;
  dates: string[];
  weekly_frequency: number;
  weekly_completion_count: number;
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
    is_done: boolean;
    start_date: Date;
    end_date: Date;
    dates: string[];
    weekly_frequency: number;
    weekly_completion_count: number;
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
  is_done: boolean;
  start_date: Date;
  end_date: Date;
  dates: string[];
  weekly_frequency: number;
  weekly_completion_count: number;
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
  is_done: boolean;
  start_date: Date;
  end_date: Date;
  dates: string[];
  weekly_frequency: number;
  weekly_completion_count: number;
};
