export type AuthResponse = {
  status: string;
};

export type SignupResponse = {
  status: string;
};

export type LoginResponse = {
  status: string;
};

export type GetLoginUserResponse = {
  status: string;
  name: string;
  email: string;
  exp: number;
  level: number;
};
