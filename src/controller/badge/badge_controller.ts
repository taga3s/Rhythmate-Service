import { Request, Response, response } from "express";
import { getUserIdFromToken } from "../../core/jwt";
import { Badge } from "../../model/badge/types";
import { HttpError } from "../../pkg/httpError";
import { achieveBadgeService, listBadgesService, pinBadgeService, unpinBadgeService } from "../../service/badge";
import { AchieveBadgeResponse, ListBadgesResponse } from "./response";

// バッジの達成
export const achieveBadgeController = async (req: Request<{ badgeId: string }>, res: Response) => {
  const userId = getUserIdFromToken(req.cookies.access_token);
  const inputDTO = {
    badgeId: req.params.badgeId,
    userId: userId,
  };

  try {
    const outputDTO = await achieveBadgeService(inputDTO);
    const response: AchieveBadgeResponse = {
      status: "ok",
      id: outputDTO.id,
      badge_id: outputDTO.badgeId,
      obtained_at: outputDTO.obtainedAt,
      is_pinned: outputDTO.isPinned,
    };
    return res.status(200).json(response);
  } catch (err) {
    if (err instanceof HttpError) {
      return res.status(err.statusCode).json({ status: "error", message: err.message });
    } else {
      return res.status(500).json({ status: "error", message: "Internal server error." });
    }
  }
};

// バッジのリスト取得
export const listBadgeController = async (req: Request, res: Response) => {
  const userId = getUserIdFromToken(req.cookies.access_token);
  const inputDTO = { userId: userId };

  try {
    const outputDTO = await listBadgesService(inputDTO);
    const response: ListBadgesResponse = {
      status: "ok",
      badges: outputDTO.badges?.map((badge: Badge) => {
        return {
          id: badge.id,
          badge_id: badge.badgeId,
          obtained_at: badge.obtainedAt,
          is_pinned: badge.isPinned,
        };
      }),
    };
    return res.status(200).json(response);
  } catch (err) {
    if (err instanceof HttpError) {
      return res.status(err.statusCode).json({ status: "error", message: err.message });
    } else {
      return res.status(500).json({ status: "error", message: "Internal server error." });
    }
  }
};
