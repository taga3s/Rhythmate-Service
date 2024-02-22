export type SignupRequest = {
  name: string
  email: string
  password: string
  password_confirmation: string
}

export type LoginRequest = {
  email: string
  password: string
}

export type UpdateLoginUserRequest = {
  name: string
}
