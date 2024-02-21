import { questModel } from "../../model/user/quest_model"
import { CustomError } from "../../pkg/customError";

export const updateQuestService = async (inputDTO: { id: string, title: string, description: string, startsAt: Date, startedAt: Date, minutes: number, tagId: string, difficulty: string, isDone: boolean, startDate: Date, endDate: Date, dates: string[], weeklyFrequency: number, weeklyCompletionCount: number, userId: string }) => {
    const model = questModel;
    if (inputDTO.minutes < 0) {
        throw new CustomError("実施時間は正の値を入力してください", 400)
    }

    const quest = await model.update(inputDTO.id, inputDTO.title, inputDTO.description, inputDTO.startsAt, inputDTO.startedAt, inputDTO.minutes, inputDTO.tagId, inputDTO.difficulty, inputDTO.isDone, inputDTO.startDate, inputDTO.endDate, inputDTO.dates, inputDTO.weeklyFrequency, inputDTO.weeklyCompletionCount, new Date(), new Date(), inputDTO.userId)
    
    return {
        title: quest.title,
        description: quest.description,
        startsAt: quest.startsAt,
        minutes: quest.minutes,
        tagId: quest.tagId,
        difficulty: quest.difficulty,
        isDone: quest.isDone,
        startDate: quest.startDate,
        endDate: quest.endDate,
        dates: quest.dates,
        weeklyFrequency: quest.weeklyFrequency,
        weeklyCompletionCount: quest.weeklyCompletionCount,
        userId: quest.userId
    }
    }
