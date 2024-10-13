import { TagModel } from "../../model/tag/tag_model";

export const listTagsService = async (inputDTO: { userId: string }) => {
  const model = new TagModel();

  const tags = await model.listByUserId({ userId: inputDTO.userId });

  return {
    tags: tags,
  };
};
