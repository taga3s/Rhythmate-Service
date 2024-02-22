import { questModel } from "../../model/quest/quest_model"
import { CustomError } from "../../pkg/customError";

export const getQuestByUserIdService = async (inputDTO: { user_id: string }) => {
    const model = questModel;
    console.log(inputDTO)
    const quests = await model.getByUserId(inputDTO.user_id);
    return {
        quests: quests
    }
}