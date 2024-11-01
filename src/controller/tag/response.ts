import * as schemaHelper from "../../pkg/schema/schemaHelper";

export type CreateTagResponse = schemaHelper.ResponseData<"/tags", "post">;

export type UpdateTagResponse = schemaHelper.ResponseData<"/tags/:id", "patch">;

export type ListTagsResponse = schemaHelper.ResponseData<"/tags", "get">;

export type DeleteTagResponse = schemaHelper.ResponseData<"/tags/:id", "delete">;

type TagBaseResponse = {
  id: string;
  name: string;
  color: string;
  created_at: Date;
  updated_at: Date;
};

export const toTagBaseResponse = (obj: {
  id: string;
  name: string;
  color: string;
  createdAt: Date;
  updatedAt: Date;
}): TagBaseResponse => {
  return {
    id: obj.id,
    name: obj.name,
    color: obj.color,
    created_at: obj.createdAt,
    updated_at: obj.updatedAt,
  };
};
