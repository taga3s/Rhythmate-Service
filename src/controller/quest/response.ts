import * as schemaHelper from "../../pkg/schemaHelper";

export type CreateQuestResponse = schemaHelper.ResponseData<"/quests", "post">;

export type UpdateQuestResponse = schemaHelper.ResponseData<"/quests/:id", "patch">;

export type DeleteQuestResponse = schemaHelper.ResponseData<"/quests/:id", "delete">;

export type ListQuestsResponse = schemaHelper.ResponseData<"/quests", "get">;

export type StartQuestResponse = schemaHelper.ResponseData<"/quests/start/:id", "patch">;

export type FinishQuestResponse = schemaHelper.ResponseData<"/quests/finish/:id", "patch">;

export type ForceFinishQuestResponse = schemaHelper.ResponseData<"/quests/force-finish/:id", "patch">;

type QuestBaseResponse = {
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
  days: string[];
  continuation_level: number;
  weekly_frequency: number;
  weekly_completion_count: number;
  total_completion_count: number;
};

export const toQuestBaseResponse = (obj: {
  id: string;
  title: string;
  description: string;
  startsAt: string;
  startedAt: string;
  minutes: number;
  tagId: string;
  difficulty: string;
  state: string;
  isSucceeded: boolean;
  continuationLevel: number;
  days: string[];
  weeklyFrequency: number;
  weeklyCompletionCount: number;
  totalCompletionCount: number;
}): QuestBaseResponse => {
  return {
    id: obj.id,
    title: obj.title,
    description: obj.description,
    starts_at: obj.startsAt,
    started_at: obj.startedAt,
    minutes: obj.minutes,
    tag_id: obj.tagId,
    difficulty: obj.difficulty,
    state: obj.state,
    is_succeeded: obj.isSucceeded,
    continuation_level: obj.continuationLevel,
    days: obj.days,
    weekly_frequency: obj.weeklyFrequency,
    weekly_completion_count: obj.weeklyCompletionCount,
    total_completion_count: obj.totalCompletionCount,
  };
};
