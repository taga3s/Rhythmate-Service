import { questModel } from "../../model/quest/quest_model"
import { CustomError } from "../../pkg/customError";
type inputDTO = { id: string, title: string, description: string, startsAt: string, startedAt: string, minutes: number, tagId: string, difficulty: string, isDone: boolean, startDate: Date, endDate: Date, dates: string[], weeklyCompletionCount: number, userId: string }

export const updateQuestService = async (inputDTO: inputDTO) => {
    const model = questModel;
    
    if (inputDTO.minutes < 0) {
        throw new CustomError("実施時間は正の値を入力してください", 400)
    }
    const quest = await model.getById(inputDTO.id);
    if (!quest){
        throw new CustomError("指定したidのクエストが存在しません", 400);
    }

    const updatedQuest = await model.update(inputDTO.id, inputDTO.title, inputDTO.description, inputDTO.startsAt, inputDTO.startedAt, inputDTO.minutes, inputDTO.tagId, inputDTO.difficulty, inputDTO.isDone, inputDTO.startDate, inputDTO.endDate, inputDTO.dates, inputDTO.weeklyCompletionCount, inputDTO.startDate, inputDTO.endDate, inputDTO.userId)
    
    return {
        title: updatedQuest.title,
        description: updatedQuest.description,
        startsAt: updatedQuest.startsAt,
        minutes: updatedQuest.minutes,
        tagId: updatedQuest.tagId,
        difficulty: updatedQuest.difficulty,
        isDone: updatedQuest.isDone,
        startDate: updatedQuest.startDate,
        endDate: updatedQuest.endDate,
        dates: updatedQuest.dates,
        weeklyFrequency: updatedQuest.weeklyFrequency,
        weeklyCompletionCount: updatedQuest.weeklyCompletionCount,
        userId: updatedQuest.userId
    }
    }
