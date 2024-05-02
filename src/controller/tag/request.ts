import * as schemaHelper from "../../pkg/schemaHelper";

// export type CreateTagRequest = {
//   name: string;
//   color: string;
// };

// export type UpdateTagRequest = {
//   name: string;
//   color: string;
// };

export type CreateTagRequest = schemaHelper.RequestData<"/tags", "post">;

export type UpdateTagRequest = schemaHelper.RequestData<"/tags/:id", "patch">;
