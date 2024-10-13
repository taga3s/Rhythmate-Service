import * as schemaHelper from "../../pkg/schema/schemaHelper";

export type AuthRequest = schemaHelper.RequestData<"/users/auth", "post">;

export type UpdateLoginUserRequest = schemaHelper.RequestData<"/users/me", "patch">;
