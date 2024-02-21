export type signupRequest = {
  name: string
  email: string
  password: string
  password_confirmation: string
}

export type loginRequest = {
  email: string
  password: string
}

export type updateUserRequest = {
  username: string
}