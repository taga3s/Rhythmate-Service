import { Request, Response } from "express";
import { getUserIdFromToken } from "../../pkg/jwt/jwt";
import { Quest } from "../../model/quest/types";
import { HttpError } from "../../utils/httpError";
import {
  createQuestService,
  deleteQuestService,
  finishQuestService,
  listQuestsService,
  startQuestService,
  updateQuestService,
  forceFinishQuestService,
} from "../../service/quest";
import { CreateQuestRequest, UpdateQuestRequest } from "../quest/request";
import {
  CreateQuestResponse,
  DeleteQuestResponse,
  FinishQuestResponse,
  ForceFinishQuestResponse,
  ListQuestsResponse,
  StartQuestResponse,
  UpdateQuestResponse,
  toQuestBaseResponse,
} from "../quest/response";

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
    days: req.body.days,
    state: req.body.state,
    userId: userId,
  };

  try {
    const outputDTO = await createQuestService(inputDTO);
    const questBaseResponse = toQuestBaseResponse(outputDTO);
    const response: CreateQuestResponse = {
      status: "ok",
      ...questBaseResponse,
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

    const questBaseResponses = outputDTO.quests.map((quest: Quest) => toQuestBaseResponse(quest));
    const response: ListQuestsResponse = {
      status: "ok",
      quests: questBaseResponses,
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
    state: req.body.state,
    minutes: req.body.minutes,
    tagId: req.body.tag_id,
    difficulty: req.body.difficulty,
    days: req.body.days,
    userId: userId,
  };

  try {
    const outputDTO = await updateQuestService(inputDTO);

    const questBaseResponse = toQuestBaseResponse(outputDTO);
    const response: UpdateQuestResponse = {
      status: "ok",
      ...questBaseResponse,
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

    const questBaseResponse = toQuestBaseResponse(outputDTO);
    const response: StartQuestResponse = {
      status: "ok",
      ...questBaseResponse,
    };
    return res.status(200).json(response);
  } catch (err) {
    if (err instanceof HttpError) {
      return res.status(err.statusCode).json({ status: "error", message: err.message });
    }
    return res.status(500).json({ status: "error", message: "Internal server error." });
  }
};

// クエストの終了
export const finishQuestController = async (req: Request<{ id: string }>, res: Response) => {
  const userId = getUserIdFromToken(req.cookies.access_token);
  const inputDTO = { id: req.params.id, userId: userId };

  try {
    const outputDTO = await finishQuestService(inputDTO);

    const questBaseResponse = toQuestBaseResponse(outputDTO);
    const response: FinishQuestResponse = {
      status: "ok",
      ...questBaseResponse,
    };
    return res.status(200).json(response);
  } catch (err) {
    if (err instanceof HttpError) {
      return res.status(err.statusCode).json({ status: "error", message: err.message });
    }
    return res.status(500).json({ status: "error", message: "Internal server error." });
  }
};

// クエストの強制終了
export const forceFinishQuestController = async (req: Request<{ id: string }>, res: Response) => {
  const userId = getUserIdFromToken(req.cookies.access_token);
  const inputDTO = { id: req.params.id, userId: userId };

  try {
    const outputDTO = await forceFinishQuestService(inputDTO);

    const questBaseResponse = toQuestBaseResponse(outputDTO);
    const response: ForceFinishQuestResponse = {
      status: "ok",
      ...questBaseResponse,
    };
    return res.status(200).json(response);
  } catch (err) {
    if (err instanceof HttpError) {
      return res.status(err.statusCode).json({ status: "error", message: err.message });
    }
    return res.status(500).json({ status: "error", message: "Internal server error." });
  }
};
