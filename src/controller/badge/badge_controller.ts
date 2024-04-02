import { Request, Response, response } from "express";
import { getUserIdFromToken } from "../../core/jwt";
import { BadgeWithDetail } from "../../model/badge/types";
import { HttpError } from "../../pkg/httpError";
import { achieveBadgeService, listBadgesService, pinBadgeService, unpinBadgeService } from "../../service/badge";
import { AchieveBadgeResponse, ListBadgesResponse, PinBadgeResponse, UnpinBadgeResponse } from "./response";

// バッジの達成
export const achieveBadgeController = async (req: Request<{ badge_id: string }>, res: Response) => {
  const userId = getUserIdFromToken(req.cookies.access_token);
  const inputDTO = {
    badgeId: req.params.badge_id,
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
export const listBadgesController = async (req: Request, res: Response) => {
  const userId = getUserIdFromToken(req.cookies.access_token);
  const inputDTO = { userId: userId };

  try {
    const outputDTO = await listBadgesService(inputDTO);
    const response: ListBadgesResponse = {
      status: "ok",
      badgesWithDetail: outputDTO.badgesWithDetail.map((badgeWithDetail: BadgeWithDetail) => {
        return {
          id: badgeWithDetail.id,
          badge_id: badgeWithDetail.badgeId,
          name: badgeWithDetail.name,
          description: badgeWithDetail.description,
          image_type: badgeWithDetail.imageType,
          obtained_at: badgeWithDetail.obtainedAt,
          is_pinned: badgeWithDetail.isPinned,
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

// バッジのピン留め
export const pinBadgeController = async (req: Request<{ id: string }>, res: Response) => {
  const inputDTO = {
    id: req.params.id,
  };

  try {
    const outputDTO = await pinBadgeService(inputDTO);
    const response: PinBadgeResponse = {
      status: "ok",
      id: outputDTO.id,
      badge_id: outputDTO.badgeId,
      name: outputDTO.name,
      description: outputDTO.description,
      image_type: outputDTO.imageType,
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

// バッジのピン留め解除
export const unpinBadgeController = async (req: Request<{ id: string }>, res: Response) => {
  const inputDTO = {
    id: req.params.id,
  };

  try {
    const outputDTO = await unpinBadgeService(inputDTO);
    const response: UnpinBadgeResponse = {
      status: "ok",
      id: outputDTO.id,
      badge_id: outputDTO.badgeId,
      name: outputDTO.name,
      description: outputDTO.description,
      image_type: outputDTO.imageType,
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
