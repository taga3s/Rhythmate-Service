export type CreateQuestRequest = {
  title: string
  description: string
  startsAt: Date
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
  id: string
  title: string
  description: string
  startsAt: Date
  minutes: number
  tagId: string
  difficulty: string
  startDate: Date
  endDate: Date
  weeklyFrequency: number
}

// export type getQuestRequest = {
//   userId: string
// }