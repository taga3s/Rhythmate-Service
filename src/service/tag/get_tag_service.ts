import { TagModel } from "../../model/tag/tag_model";
import { HttpError } from "../../pkg/httpError";

export const getTagService = async (inputDTO: { userId: string }) => {
  const model = new TagModel();
  const tags = await model.getByUserId(inputDTO.userId);
  if (tags === null) {
    throw new HttpError("タグが見つかりませんでした", 500);
  }
  return {
    tags: tags,
  };
};
