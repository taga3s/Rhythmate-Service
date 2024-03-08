import { QuestModel } from "../../model/quest/quest_model";
import { HttpError } from "../../pkg/httpError";

export const listQuestsService = async (inputDTO: { userId: string }) => {
  const questModel = new QuestModel();
  const quests = await questModel.listByUserId(inputDTO.userId);
  if (quests === null) {
    throw new HttpError("クエストが見つかりませんでした", 500);
  }
  return {
    quests: quests,
  };
};
