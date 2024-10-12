import { QuestModel } from "../../model/quest/quest_model";
import { HttpError } from "../../utils/httpError";

type InputDTO = { userId: string };

export const listQuestsService = async (inputDTO: InputDTO) => {
  const questModel = new QuestModel();

  const quests = await questModel.listByUserId({
    userId: inputDTO.userId,
  });

  return {
    quests: quests,
  };
};
