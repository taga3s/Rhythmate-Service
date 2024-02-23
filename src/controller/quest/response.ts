import { Quest } from '../../model/quest/types'

export type CreateQuestResponse = {
  status: string
}

export type DeleteQuestResponse = {
  status: string
}

export type UpdateQuestResponse = {
  status: string
}

export type GetQuestResponse = {
  status: string
  quests: Quest[] | null
}