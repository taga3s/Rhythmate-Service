import { Quest } from '../../model/quest/types'

export type createQuestResponse = {
  status: string
}

export type deleteQuestResponse = {
  status: string
}

export type updateQuestResponse = {
  status: string
}

export type getQuestByUserIdResponse = {
  status: string
  quests: Quest[] | null
}