import { questModel } from "../../model/quest/quest_model";
import { HttpError } from "../../pkg/httpError";

export const listQuestsService = async (inputDTO: { userId: string }) => {
  const model = questModel;
  const quests = await model.listByUserId(inputDTO.userId);
  if (quests === null) {
    throw new HttpError("クエストが見つかりませんでした", 500);
  }
  return {
    quests: quests,
  };
};
