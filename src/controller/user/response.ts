export type AuthResponse = {
  status: string;
};

export type GetLoginUserResponse = {
  status: string;
  name: string;
  email: string;
  exp: number;
  level: number;
  imageUrl: string;
};

export type DeleteUserResponce = {
  status: string;
}
