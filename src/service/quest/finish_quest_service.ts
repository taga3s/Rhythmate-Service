import { questModel } from "../../model/quest/quest_model"
import { CustomError } from "../../pkg/customError";
type inputDTO = { id: string }

export const finishQuestService = async (inputDTO: inputDTO) => {
    const model = questModel;
    const quest = await model.getById(inputDTO.id);
    if (!quest){
        throw new CustomError("指定したidのクエストが存在しません", 400);
    }
    const finishedQuest = await model.finishById(inputDTO.id);
    if (!finishedQuest) {
        throw new CustomError("クエストの完了に失敗しました", 500);
    }
    
    return {
        id: finishedQuest.id,
        title: finishedQuest.title,
        description: finishedQuest.description,
        startsAt: finishedQuest.startsAt,
        startedAt: finishedQuest.startedAt,
        minutes: finishedQuest.minutes,
        tagId: finishedQuest.tagId,
        difficulty: finishedQuest.difficulty,
        isDone: finishedQuest.isDone,
        startDate: finishedQuest.startDate,
        endDate: finishedQuest.endDate,
        dates: finishedQuest.dates,
        weeklyFrequency: finishedQuest.weeklyFrequency,
        weeklyCompletionCount: finishedQuest.weeklyCompletionCount,
        userId: finishedQuest.userId
    }
}
