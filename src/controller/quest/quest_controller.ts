import { Request, Response } from "express";
import { CreateQuestRequest, UpdateQuestRequest } from "../quest/request";
import {
  CreateQuestResponse,
  DeleteQuestResponse,
  UpdateQuestResponse,
  StartQuestResponse,
  FinishQuestResponse,
  ForceFinishQuestResponse,
  ListQuestsResponse,
} from "../quest/response";
import { getUserIdFromToken } from "../../core/jwt";
import { HttpError } from "../../pkg/httpError";
import { Quest } from "../../model/quest/types";
import { forceFinishQuestService } from "../../service/quest/force_finish_quest_service";
import {
  createQuestService,
  deleteQuestService,
  finishQuestService,
  listQuestsService,
  startQuestService,
  updateQuestService,
} from "../../service/quest";

// クエストの作成
export const createQuestController = async (req: Request<{}, {}, CreateQuestRequest>, res: Response) => {
  const userId = getUserIdFromToken(req.cookies.access_token);
  const inputDTO = {
    title: req.body.title,
    description: req.body.description,
    startsAt: req.body.starts_at,
    minutes: req.body.minutes,
    tagId: req.body.tag_id,
    difficulty: req.body.difficulty,
    dates: req.body.dates,
    userId: userId,
  };

  try {
    const outputDTO = await createQuestService(inputDTO);
    const response: CreateQuestResponse = {
      status: "ok",
      id: outputDTO.id,
      title: outputDTO.title,
      description: outputDTO.description,
      starts_at: outputDTO.startsAt,
      started_at: outputDTO.startedAt,
      minutes: outputDTO.minutes,
      tag_id: outputDTO.tagId,
      difficulty: outputDTO.difficulty,
      state: outputDTO.state,
      is_succeeded: outputDTO.isSucceeded,
      start_date: outputDTO.startDate,
      end_date: outputDTO.endDate,
      dates: outputDTO.dates,
      weekly_frequency: outputDTO.weeklyFrequency,
    };
    return res.status(200).json(response);
  } catch (err) {
    if (err instanceof HttpError) {
      return res.status(err.statusCode).json({ status: "error", message: err.message });
    }
    return res.status(500).json({ status: "error", message: "Internal server error." });
  }
};

// ユーザーの所持するすべてのクエストを取得
export const listQuestsController = async (req: Request, res: Response) => {
  const userId = getUserIdFromToken(req.cookies.access_token);
  const inputDTO = { userId: userId };

  try {
    const outputDTO = await listQuestsService(inputDTO);
    const response: ListQuestsResponse = {
      status: "ok",
      quests: outputDTO.quests?.map((quest: Quest) => {
        return {
          id: quest.id,
          title: quest.title,
          description: quest.description,
          starts_at: quest.startsAt,
          started_at: quest.startedAt,
          minutes: quest.minutes,
          tag_id: quest.tagId,
          difficulty: quest.difficulty,
          state: quest.state,
          is_succeeded: quest.isSucceeded,
          continuation_level: quest.continuationLevel,
          start_date: quest.startDate,
          end_date: quest.endDate,
          dates: quest.dates,
          weekly_frequency: quest.weeklyFrequency,
          weekly_completion_count: quest.weeklyCompletionCount,
          total_completion_count: quest.totalCompletionCount,
        };
      }),
    };
    return res.status(200).json(response);
  } catch (err) {
    if (err instanceof HttpError) {
      return res.status(err.statusCode).json({ status: "error", message: err.message });
    }
    return res.status(500).json({ status: "error", message: "Internal server error." });
  }
};

// クエストの削除
export const deleteQuestController = async (req: Request<{ id: string }>, res: Response) => {
  const inputDTO = { id: req.params.id };

  try {
    await deleteQuestService(inputDTO);
    const response: DeleteQuestResponse = { status: "ok" };
    return res.status(200).json(response);
  } catch (err) {
    if (err instanceof HttpError) {
      return res.status(err.statusCode).json({ status: "error", message: err.message });
    }
    return res.status(500).json({ status: "error", message: "Internal server error." });
  }
};

// クエストの更新
export const updateQuestController = async (req: Request<{ id: string }, {}, UpdateQuestRequest>, res: Response) => {
  const userId = getUserIdFromToken(req.cookies.access_token);
  const inputDTO = {
    id: req.params.id,
    title: req.body.title,
    description: req.body.description,
    startsAt: req.body.starts_at,
    startedAt: req.body.started_at,
    minutes: req.body.minutes,
    tagId: req.body.tag_id,
    difficulty: req.body.difficulty,
    state: req.body.state,
    isSucceeded: req.body.is_succeeded,
    continuationLevel: req.body.continuation_level,
    startDate: req.body.start_date,
    endDate: req.body.end_date,
    dates: req.body.dates,
    weeklyCompletionCount: req.body.weekly_completion_count,
    totalCompletionCount: req.body.total_completion_count,
    userId: userId,
  };

  try {
    const outputDTO = await updateQuestService(inputDTO);
    const response: UpdateQuestResponse = {
      status: "ok",
      id: outputDTO.id,
      title: outputDTO.title,
      description: outputDTO.description,
      starts_at: outputDTO.startsAt,
      started_at: outputDTO.startedAt,
      minutes: outputDTO.minutes,
      tag_id: outputDTO.tagId,
      difficulty: outputDTO.difficulty,
      state: outputDTO.state,
      is_succeeded: outputDTO.isSucceeded,
      continuation_level: outputDTO.continuationLevel,
      start_date: outputDTO.startDate,
      end_date: outputDTO.endDate,
      dates: outputDTO.dates,
      weekly_frequency: outputDTO.weeklyFrequency,
      weekly_completion_count: outputDTO.weeklyCompletionCount,
      total_completion_count: outputDTO.totalCompletionCount,
    };
    return res.status(200).json(response);
  } catch (err) {
    if (err instanceof HttpError) {
      return res.status(err.statusCode).json({ status: "error", message: err.message });
    }
    return res.status(500).json({ status: "error", message: "Internal server error." });
  }
};

// クエストの開始
export const startQuestController = async (req: Request<{ id: string }>, res: Response) => {
  const inputDTO = { id: req.params.id };

  try {
    const outputDTO = await startQuestService(inputDTO);
    const response: StartQuestResponse = {
      status: "ok",
      id: outputDTO.id,
      title: outputDTO.title,
      description: outputDTO.description,
      starts_at: outputDTO.startsAt,
      started_at: outputDTO.startedAt,
      minutes: outputDTO.minutes,
      tag_id: outputDTO.tagId,
      difficulty: outputDTO.difficulty,
      state: outputDTO.state,
      is_succeeded: outputDTO.isSucceeded,
      continuation_level: outputDTO.continuationLevel,
      start_date: outputDTO.startDate,
      end_date: outputDTO.endDate,
      dates: outputDTO.dates,
      weekly_frequency: outputDTO.weeklyFrequency,
      weekly_completion_count: outputDTO.weeklyCompletionCount,
      total_completion_count: outputDTO.totalCompletionCount,
    };
    return res.status(200).json(response);
  } catch (err) {
    if (err instanceof HttpError) {
      return res.status(err.statusCode).json({ status: "error", message: err.message });
    }
    return res.status(500).json({ status: "error", message: "Internal server error." });
  }
};

// クエストの完了
export const finishQuestController = async (req: Request<{ id: string }>, res: Response) => {
  const userId = getUserIdFromToken(req.cookies.access_token);
  const inputDTO = { id: req.params.id, userId: userId };

  try {
    const outputDTO = await finishQuestService(inputDTO);
    const response: FinishQuestResponse = {
      status: "ok",
      id: outputDTO.id,
      title: outputDTO.title,
      description: outputDTO.description,
      starts_at: outputDTO.startsAt,
      started_at: outputDTO.startedAt,
      minutes: outputDTO.minutes,
      tag_id: outputDTO.tagId,
      difficulty: outputDTO.difficulty,
      state: outputDTO.state,
      is_succeeded: outputDTO.isSucceeded,
      continuation_level: outputDTO.continuationLevel,
      start_date: outputDTO.startDate,
      end_date: outputDTO.endDate,
      dates: outputDTO.dates,
      weekly_frequency: outputDTO.weeklyFrequency,
      weekly_completion_count: outputDTO.weeklyCompletionCount,
      total_completion_count: outputDTO.totalCompletionCount,
    };
    return res.status(200).json(response);
  } catch (err) {
    if (err instanceof HttpError) {
      return res.status(err.statusCode).json({ status: "error", message: err.message });
    }
    return res.status(500).json({ status: "error", message: "Internal server error." });
  }
};

// クエストの強制完了(失敗の場合)
export const forceFinishQuestController = async (req: Request<{ id: string }>, res: Response) => {
  const userId = getUserIdFromToken(req.cookies.access_token);
  const inputDTO = { id: req.params.id, userId: userId };

  try {
    const outputDTO = await forceFinishQuestService(inputDTO);
    const response: ForceFinishQuestResponse = {
      status: "ok",
      id: outputDTO.id,
      title: outputDTO.title,
      description: outputDTO.description,
      starts_at: outputDTO.startsAt,
      started_at: outputDTO.startedAt,
      minutes: outputDTO.minutes,
      tag_id: outputDTO.tagId,
      difficulty: outputDTO.difficulty,
      state: outputDTO.state,
      is_succeeded: outputDTO.isSucceeded,
      continuation_level: outputDTO.continuationLevel,
      start_date: outputDTO.startDate,
      end_date: outputDTO.endDate,
      dates: outputDTO.dates,
      weekly_frequency: outputDTO.weeklyFrequency,
      weekly_completion_count: outputDTO.weeklyCompletionCount,
      total_completion_count: outputDTO.totalCompletionCount,
    };
    return res.status(200).json(response);
  } catch (err) {
    if (err instanceof HttpError) {
      return res.status(err.statusCode).json({ status: "error", message: err.message });
    }
    return res.status(500).json({ status: "error", message: "Internal server error." });
  }
};
