import { prisma } from "../../db/db";
import { QuestModel } from "../../model/quest/quest_model";
import { HttpError } from "../../pkg/httpError";

export const deleteQuestService = async (inputDTO: { id: string }) => {
  return prisma.$transaction(async (tx) => {
    const model = new QuestModel();

    const quest = await model.getById(inputDTO.id);
    if (!quest) {
      throw new HttpError("指定したidのクエストが存在しません", 400);
    }

    const result = await model.deleteByIdWithTx(inputDTO.id, tx);

    return {
      result: result,
    };
  });
};
