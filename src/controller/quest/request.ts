export type CreateQuestRequest = {
  title: string
  description: string
  startsAt: string
  minutes: number
  tagId: string
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
  startsAt: string
  startedAt: string
  minutes: number
  tagId: string
  difficulty: string
  isDone: boolean
  startDate: Date
  endDate: Date
  dates: string[]
  weeklyCompletionCount: number
}

// export type getQuestRequest = {
//   userId: string
// }