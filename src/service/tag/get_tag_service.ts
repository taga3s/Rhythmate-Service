import { tagModel } from '../../model/tag/tag_model';
import { CustomError } from '../../pkg/customError';

export const getTagService = async (inputDTO:{
  userId: string;
}) => {
  const model = tagModel;
  const tags = await model.getByUserId(inputDTO.userId);
  if (tags === null) {
    throw new CustomError('タグが見つかりませんでした', 500);
  }
  return {
    tags: tags
  };
};
