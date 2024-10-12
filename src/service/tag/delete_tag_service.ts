import { prisma } from "../../db/db";
import { TagModel } from "../../model/tag/tag_model";
import { HttpError } from "../../utils/httpError";

export const deleteTagService = async (inputDTO: { id: string }) => {
  return prisma.$transaction(async (tx) => {
    const model = new TagModel();

    const tag = await model.getById({ id: inputDTO.id });
    if (tag === null) {
      throw new HttpError("タグが見つかりません", 404);
    }

    const result = await model.deleteByIdWithTx({
      id: inputDTO.id,
      tx,
    });

    return {
      name: result.name,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
      userId: result.userId,
    };
  });
};
