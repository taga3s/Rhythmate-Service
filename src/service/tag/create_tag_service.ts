import { TagModel } from "../../model/tag/tag_model";

export const createTagService = async (inputDTO: {
  name: string;
  userId: string;
}) => {
  const model = new TagModel();
  const tag = await model.create(inputDTO.name, inputDTO.userId);
  return {
    id: tag.id,
    name: tag.name,
    createdAt: tag.createdAt,
    updatedAt: tag.updatedAt,
    userId: tag.userId,
  };
};
