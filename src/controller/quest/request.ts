export type createQuestRequest = {
  title: string
  description: string
  startsAt: Date
  minutes: number
  tagId: string
  difficulty: string
  dates: string[]
  userId: string
}

export type deleteQuestRequest = {
  id: string
}

export type updateQuestRequest = {
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

export type getQuestByUserIdRequest = {
  userId: string
}