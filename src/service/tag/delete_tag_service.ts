import { tagModel } from '../../model/tag/tag_model';
import { CustomError } from '../../pkg/customError';

export const deleteTagService = async (inputDTO:{
  id: string;
}) => {
  const model = tagModel;
  const tag = await model.getById(inputDTO.id);
  if(tag === null){
    throw new CustomError('タグが見つかりません', 404);
  }
  const result = await model.deleteById(inputDTO.id);
  if (result === null) {
    throw new CustomError('タグの削除に失敗しました', 500);
  }
  return {
    name: result.name,
    createdAt: result.createdAt,
    updatedAt: result.updatedAt,
    userId: result.userId,
  };
};