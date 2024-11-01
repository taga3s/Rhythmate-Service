import * as schemaHelper from "../../pkg/schema/schemaHelper";

export type AuthResponse = schemaHelper.ResponseData<"/users/auth", "post">;

export type GetLoginUserResponse = schemaHelper.ResponseData<"/users/me", "get">;

export type UpdateLoginUserResponse = schemaHelper.ResponseData<"/users/me", "patch">;

export type DeleteUserResponse = schemaHelper.ResponseData<"/users/me", "delete">;

type UserBaseResponse = {
  name: string;
  email: string;
  exp: number;
  level: number;
  imageUrl: string;
};

export const toUserBaseResponse = (user: {
  name: string;
  email: string;
  exp: number;
  level: number;
  imageUrl: string;
}): UserBaseResponse => {
  return {
    name: user.name,
    email: user.email,
    exp: user.exp,
    level: user.level,
    imageUrl: user.imageUrl,
  };
};
