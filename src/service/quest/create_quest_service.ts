import { questModel } from "../../model/quest/quest_model";
import { CustomError } from "../../pkg/customError";

export const createQuestService = async (inputDTO: {
  title: string;
  description: string;
  startsAt: string;
  minutes: number;
  tagId: string;
  difficulty: string;
  dates: string[];
  userId: string;
}) => {
  const model = questModel;
  if (inputDTO.minutes < 0) {
    throw new CustomError("実施時間は正の値を入力してください", 400);
  }
  const quest = await model.create(
    inputDTO.title,
    inputDTO.description,
    inputDTO.startsAt,
    inputDTO.minutes,
    inputDTO.tagId,
    inputDTO.difficulty,
    inputDTO.dates,
    inputDTO.userId,
  );
  return {
    id : quest.id,
    title: quest.title,
    description: quest.description,
    startsAt: quest.startsAt,
    startedAt: quest.startedAt,
    minutes: quest.minutes,
    tagId: quest.tagId,
    difficulty: quest.difficulty,
    state: quest.state,
    isSucceeded: quest.isSucceeded,
    startDate: quest.startDate,
    endDate: quest.endDate,
    dates: quest.dates,
    weeklyFrequency: quest.weeklyFrequency,
    userId: quest.userId,
  };
};
