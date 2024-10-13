import * as schemaHelper from "../../pkg/schema/schemaHelper";

export type CreateTagResponse = schemaHelper.ResponseData<"/tags", "post">;

export type UpdateTagResponse = schemaHelper.ResponseData<"/tags/:id", "patch">;

export type ListTagsResponse = schemaHelper.ResponseData<"/tags", "get">;

export type DeleteTagResponse = schemaHelper.ResponseData<"/tags/:id", "delete">;
