import { prisma } from "../../db/db";
import { TagModel } from "../../model/tag/tag_model";

export const createTagService = async (inputDTO: {
  name: string;
  color: string;
  userId: string;
}) => {
  return prisma.$transaction(async (tx) => {
    const model = new TagModel();

    const tag = await model.createWithTx({
      name: inputDTO.name,
      color: inputDTO.color,
      userId: inputDTO.userId,
      tx,
    });

    return {
      id: tag.id,
      name: tag.name,
      color: tag.color,
      createdAt: tag.createdAt,
      updatedAt: tag.updatedAt,
      userId: tag.userId,
    };
  });
};
