import { questModel } from "../../model/user/quest_model"
import { CustomError } from "../../pkg/customError";
    
export const deleteQuestService = async (inputDTO: { id: string }) => {
    const model = questModel;
    const quest = await model.getById(inputDTO.id);
    if (!quest){
        throw new CustomError("指定したidのクエストが存在しません", 400);
    }
    const result = await model.deleteById(inputDTO.id);
    return {
        result: result
    }
    }