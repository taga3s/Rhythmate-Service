import { Quest } from '../../model/quest/types'

export type signupResponse = {
  status: string
}
export type loginResponse = {
  status: string
}
export type getLoginUserResponse = {
  status: string
  name: string
  email: string
  level: number
}
