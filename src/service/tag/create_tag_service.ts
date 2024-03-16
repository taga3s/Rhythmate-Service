import { prisma } from "../../db/db";
import { TagModel } from "../../model/tag/tag_model";

export const createTagService = async (inputDTO: {
  name: string;
  userId: string;
}) => {
  return prisma.$transaction(async (tx) => {
    const model = new TagModel();
    const tag = await model.createWithTx(inputDTO.name, inputDTO.userId, tx);
    return {
      id: tag.id,
      name: tag.name,
      createdAt: tag.createdAt,
      updatedAt: tag.updatedAt,
      userId: tag.userId,
    };
  });
};
