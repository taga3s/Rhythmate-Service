import * as schemaHelper from "../../pkg/schema/schemaHelper";

export type CreateTagRequest = schemaHelper.RequestData<"/tags", "post">;

export type UpdateTagRequest = schemaHelper.RequestData<"/tags/:id", "patch">;
