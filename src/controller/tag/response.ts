export type CreateTagResponse = {
  status: string;
  id: string;
  name: string;
  created_at: Date;
  updated_at: Date;
};

export type UpdateTagResponse = {
  status: string;
  id: string;
  name: string;
  created_at: Date;
  updated_at: Date;
};

export type GetTagResponse = {
  status: string;
  tags: {
    id: string;
    name: string;
    created_at: Date;
    updated_at: Date;
  }[];
};

export type DeleteTagResponse = {
  status: string;
};
