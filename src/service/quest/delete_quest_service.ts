import { questModel } from "../../model/quest/quest_model";
import { HttpError } from "../../pkg/httpError";

export const deleteQuestService = async (inputDTO: { id: string }) => {
  const model = questModel;
  const quest = await model.getById(inputDTO.id);
  if (!quest) {
    throw new HttpError("指定したidのクエストが存在しません", 400);
  }
  const result = await model.deleteById(inputDTO.id);
  return {
    result: result,
  };
};
