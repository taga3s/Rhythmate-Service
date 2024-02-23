import { tagModel } from '../../model/tag/tag_model';
import { CustomError } from '../../pkg/customError';

export const createTagService = async (inputDTO:{
  name: string;
  userId: string;
}) => {
  const model = tagModel;
  if(inputDTO.name === ''){
    throw new CustomError('タグ名を入力してください', 400);
  }
  const tag = await model.create(inputDTO.name, inputDTO.userId);
  return {
    id : tag.id,
    name: tag.name,
    createdAt: tag.createdAt,
    updatedAt: tag.updatedAt,
    userId: tag.userId,
  };
};