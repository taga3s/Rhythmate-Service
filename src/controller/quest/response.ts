import { Quest } from '../../model/quest/types'

export type CreateQuestResponse = {
  status: string
  title: string,
  description: string,
  starts_at: string,
  minutes: number,
  tag_id: string,
  difficulty: string,
  is_done: boolean,
  start_date: Date,
  end_date: Date,
  dates: string[],
  weekly_frequency: number,
  user_id: string
}

export type UpdateQuestResponse = {
  status: string
  title: string,
  description: string,
  starts_at: string,
  minutes: number,
  tag_id: string,
  difficulty: string,
  is_done: boolean,
  start_date: Date,
  end_date: Date,
  dates: string[],
  weekly_frequency: number,
  weekly_completion_count: number,
  user_id: string
}

export type DeleteQuestResponse = {
  status: string
}

export type GetQuestResponse = {
  status: string
  quests: {
    id: string,
    title: string,
    description: string,
    starts_at: string,
    started_at: string,
    minutes: number,
    tag_id: string,
    difficulty: string,
    is_done: boolean,
    start_date: Date,
    end_date: Date,
    dates: string[],
    weekly_frequency: number,
    weekly_completion_count: number,
    user_id: string}[]
}