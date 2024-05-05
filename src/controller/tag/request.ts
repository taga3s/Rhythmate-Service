import * as schemaHelper from "../../pkg/schemaHelper";

export type CreateTagRequest = schemaHelper.RequestData<"/tags", "post">;

export type UpdateTagRequest = schemaHelper.RequestData<"/tags/:id", "patch">;
