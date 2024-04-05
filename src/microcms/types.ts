export type ListBadgesDetail = {
  contents: {
    id: string;
    name: string;
    description: string;
    image_type: string;
    frame_color: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    revisedAt: string;
  }[];
  totalCount: number;
  offset: number;
};
