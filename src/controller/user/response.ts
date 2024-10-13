import * as schemaHelper from "../../pkg/schema/schemaHelper";

export type AuthResponse = schemaHelper.ResponseData<"/users/auth", "post">;

export type GetLoginUserResponse = schemaHelper.ResponseData<"/users/me", "get">;

export type UpdateLoginUserResponse = schemaHelper.ResponseData<"/users/me", "patch">;

export type DeleteUserResponse = schemaHelper.ResponseData<"/users/me", "delete">;
