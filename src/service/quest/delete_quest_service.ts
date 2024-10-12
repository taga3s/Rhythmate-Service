import { prisma } from "../../db/db";
import { QuestModel } from "../../model/quest/quest_model";
import { HttpError } from "../../pkg/httpError";

type InputDTO = { id: string };

export const deleteQuestService = async (inputDTO: InputDTO) => {
  return prisma.$transaction(async (tx) => {
    const model = new QuestModel();

    const quest = await model.getById(inputDTO.id);
    if (!quest) {
      throw new HttpError("指定したidのクエストが存在しません", 400);
    }

    const result = await model.deleteByIdWithTx({
      id: inputDTO.id,
      tx,
    });

    return {
      result: result,
    };
  });
};
