import * as schemaHelper from "../../pkg/schemaHelper";

// type TagBaseResponse = {
//   id: string;
//   name: string;
//   color: string;
//   created_at: Date;
//   updated_at: Date;
// };

// export type CreateTagResponse = TagBaseResponse & {
//   status: string;
// };

// export type UpdateTagResponse = TagBaseResponse & {
//   status: string;
// };

// export type ListTagsResponse = {
//   status: string;
//   tags: TagBaseResponse[];
// };

// export type DeleteTagResponse = {
//   status: string;
// };

export type CreateTagResponse = schemaHelper.ResponseData<"/tags", "post">;

export type UpdateTagResponse = schemaHelper.ResponseData<"/tags/:id", "patch">;

export type ListTagsResponse = schemaHelper.ResponseData<"/tags", "get">;

export type DeleteTagResponse = schemaHelper.ResponseData<"/tags/:id", "delete">;
