export type CreateTagResponse = {
  status: string;
  id: string;
  name: string;
  color: string;
  created_at: Date;
  updated_at: Date;
};

export type UpdateTagResponse = {
  status: string;
  id: string;
  name: string;
  color: string;
  created_at: Date;
  updated_at: Date;
};

export type ListTagsResponse = {
  status: string;
  tags: {
    id: string;
    name: string;
    color: string;
    created_at: Date;
    updated_at: Date;
  }[];
};

export type DeleteTagResponse = {
  status: string;
};
