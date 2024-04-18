type TagBaseResponse = {
  id: string;
  name: string;
  color: string;
  created_at: Date;
  updated_at: Date;
};

export type CreateTagResponse = TagBaseResponse & {
  status: string;
};

export type UpdateTagResponse = TagBaseResponse & {
  status: string;
};

export type ListTagsResponse = {
  status: string;
  tags: TagBaseResponse[];
};

export type DeleteTagResponse = {
  status: string;
};
