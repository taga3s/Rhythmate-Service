import { questModel } from "../../model/quest/quest_model";
import { CustomError } from "../../pkg/customError";

export const listQuestsService = async (inputDTO: { userId: string }) => {
  const model = questModel;
  const quests = await model.listByUserId(inputDTO.userId);
  if (quests === null) {
    throw new CustomError("クエストが見つかりませんでした", 500);
  }
  return {
    quests: quests,
  };
};
