import { questModel } from "../../model/quest/quest_model"
import { CustomError } from "../../pkg/customError";

export const updateQuestService = async (inputDTO: { id: string, title: string, description: string, startsAt: string, startedAt: string, minutes: number, tagId: string, difficulty: string, isDone: boolean, startDate: Date, endDate: Date, dates: string[], weeklyCompletionCount: number, userId: string }) => {
    const model = questModel;
    
    if (inputDTO.minutes < 0) {
        throw new CustomError("実施時間は正の値を入力してください", 400)
    }
    const quest = await model.getById(inputDTO.id);
    if (!quest){
        throw new CustomError("指定したidのクエストが存在しません", 400);
    }

    const quest_updated = await model.update(inputDTO.id, inputDTO.title, inputDTO.description, inputDTO.startsAt, inputDTO.startedAt, inputDTO.minutes, inputDTO.tagId, inputDTO.difficulty, inputDTO.isDone, inputDTO.startDate, inputDTO.endDate, inputDTO.dates, inputDTO.weeklyCompletionCount, inputDTO.startDate, inputDTO.endDate, inputDTO.userId)
    
    return {
        title: quest_updated.title,
        description: quest_updated.description,
        startsAt: quest_updated.startsAt,
        minutes: quest_updated.minutes,
        tagId: quest_updated.tagId,
        difficulty: quest_updated.difficulty,
        isDone: quest_updated.isDone,
        startDate: quest_updated.startDate,
        endDate: quest_updated.endDate,
        dates: quest_updated.dates,
        weeklyFrequency: quest_updated.weeklyFrequency,
        weeklyCompletionCount: quest_updated.weeklyCompletionCount,
        userId: quest_updated.userId
    }
    }
