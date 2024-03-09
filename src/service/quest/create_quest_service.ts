import { QuestModel } from "../../model/quest/quest_model";
import { formatDateTimeOnlyDate, formatDateTimeWithAddMinutes, isBefore, now } from "../../pkg/dayjs";
import { HttpError } from "../../pkg/httpError";

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
  const model = new QuestModel();
  if (inputDTO.minutes < 0) {
    throw new HttpError("実施時間は正の値を入力してください", 400);
  }

  // `クエスト作成時 < 開始時刻＋15分`の場合はINACTIVEにする
  const targetDateTime = formatDateTimeWithAddMinutes(`${formatDateTimeOnlyDate(now())} ${inputDTO.startsAt}`, 15);
  const state = isBefore(targetDateTime) ? "INACTIVE" : "ACTIVE";

  const quest = await model.create(
    inputDTO.title,
    inputDTO.description,
    inputDTO.startsAt,
    inputDTO.minutes,
    inputDTO.tagId,
    state,
    inputDTO.difficulty,
    inputDTO.dates,
    inputDTO.userId,
  );
  return {
    id: quest.id,
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
  };
};
