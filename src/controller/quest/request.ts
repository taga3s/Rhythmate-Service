export type CreateQuestRequest = {
  title: string
  description: string
  starts_at: string
  minutes: number
  tag_id: string
  difficulty: string
  dates: string[]
  // userId: string
}

// export type deleteQuestRequest = {
//   id: string
// }

export type UpdateQuestRequest = {
  // id: string
  title: string
  description: string
  starts_at: string
  started_at: string
  minutes: number
  tag_id: string
  difficulty: string
  is_Done: boolean
  start_date: Date
  end_date: Date
  dates: string[]
  weekly_completion_count: number
}

// export type getQuestRequest = {
//   userId: string
// }