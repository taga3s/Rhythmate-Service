import { TagModel } from "../../model/tag/tag_model";
import { HttpError } from "../../pkg/httpError";

export const listTagsService = async (inputDTO: { userId: string }) => {
  const model = new TagModel();

  const tags = await model.listByUserId(inputDTO.userId);
  if (tags === null) {
    throw new HttpError("タグが見つかりませんでした", 500);
  }

  return {
    tags: tags,
  };
};
