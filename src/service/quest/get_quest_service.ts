import { questModel } from "../../model/quest/quest_model"
import { CustomError } from "../../pkg/customError";


export const getQuestService = async (inputDTO: { userId: string }) => {
    const model = questModel;
    const quests = await model.getByUserId(inputDTO.userId);
    if (quests === null) {
        throw new CustomError("クエストが見つかりませんでした", 500)
    }
    return {
        quests: quests
    }
}