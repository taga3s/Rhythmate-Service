import { prisma } from "../../db/db";
import { TagModel } from "../../model/tag/tag_model";
import { HttpError } from "../../utils/httpError";

export const updateTagService = async (inputDTO: {
  id: string;
  name: string;
  color: string;
}) => {
  return prisma.$transaction(async (tx) => {
    const model = new TagModel();

    const tag = await model.getById({
      id: inputDTO.id,
    });
    if (tag === null) {
      throw new HttpError("タグが見つかりません", 404);
    }

    const result = await model.updateWithTx({
      id: inputDTO.id,
      name: inputDTO.name,
      color: inputDTO.color,
      tx,
    });

    return {
      id: result.id,
      name: result.name,
      color: result.color,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
      userId: result.userId,
    };
  });
};
