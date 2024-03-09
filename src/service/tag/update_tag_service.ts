import { TagModel } from "../../model/tag/tag_model";
import { HttpError } from "../../pkg/httpError";

export const updateTagService = async (inputDTO: {
  id: string;
  name: string;
}) => {
  const model = new TagModel();
  const tag = await model.getById(inputDTO.id);
  if (tag === null) {
    throw new HttpError("タグが見つかりません", 404);
  }
  const result = await model.update(inputDTO.id, inputDTO.name, new Date());
  return {
    id: result.id,
    name: result.name,
    createdAt: result.createdAt,
    updatedAt: result.updatedAt,
    userId: result.userId,
  };
};
