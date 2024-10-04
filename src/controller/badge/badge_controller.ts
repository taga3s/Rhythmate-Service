import { Request, Response } from "express";
import { getUserIdFromToken } from "../../core/jwt";
import { HttpError } from "../../pkg/httpError";
import { achieveBadgeService, listBadgesService, pinBadgeService, unpinBadgeService } from "../../service/badge";
import { AchieveBadgeResponse, ListBadgesResponse, PinBadgeResponse, UnpinBadgeResponse } from "./response";

// バッジの達成
export const achieveBadgeController = async (req: Request<{ id: string }>, res: Response) => {
  const userId = getUserIdFromToken(req.cookies.rtoken);
  const inputDTO = {
    badgeId: req.params.id,
    userId: userId,
  };

  try {
    const outputDTO = await achieveBadgeService(inputDTO);
    const response: AchieveBadgeResponse = {
      status: "ok",
      badge_id: outputDTO.badgeId,
      name: outputDTO.name,
      image_type: outputDTO.image_type as "bow" | "cat" | "crown" | "gem" | "horse" | "shield" | "sword",
      frame_color: outputDTO.frame_color as "bronze" | "silver" | "gold",
      description: outputDTO.description,
      obtained_at: outputDTO.obtainedAt,
      is_pinned: outputDTO.isPinned,
      unlockable: true,
    };
    return res.status(200).json(response);
  } catch (err) {
    if (err instanceof HttpError) {
      return res.status(err.statusCode).json({ status: "error", message: err.message });
    }
    return res.status(500).json({ status: "error", message: "Internal server error." });
  }
};

// バッジのリスト取得
export const listBadgesController = async (req: Request, res: Response) => {
  const userId = getUserIdFromToken(req.cookies.rtoken);
  const inputDTO = { userId: userId };

  try {
    const outputDTO = await listBadgesService(inputDTO);
    const response: ListBadgesResponse = {
      status: "ok",
      badgesWithDetail: outputDTO.badgesWithDetail.map((badge) => {
        return {
          badge_id: badge.id,
          name: badge.name,
          description: badge.description,
          image_type: badge.imageType as "bow" | "cat" | "crown" | "gem" | "horse" | "shield" | "sword",
          frame_color: badge.frameColor as "bronze" | "silver" | "gold",
          unlockable: badge.unlockable,
          obtained_at: badge.obtainedAt,
          is_pinned: badge.isPinned,
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

// バッジのピン留め
export const pinBadgeController = async (req: Request<{ id: string }>, res: Response) => {
  const inputDTO = {
    badgeId: req.params.id,
    userId: getUserIdFromToken(req.cookies.rtoken),
  };

  try {
    const outputDTO = await pinBadgeService(inputDTO);
    const response: PinBadgeResponse = {
      status: "ok",
      badge_id: outputDTO.badgeId,
      name: outputDTO.name,
      description: outputDTO.description,
      image_type: outputDTO.imageType as "bow" | "cat" | "crown" | "gem" | "horse" | "shield" | "sword",
      frame_color: outputDTO.frameColor as "bronze" | "silver" | "gold",
      obtained_at: outputDTO.obtainedAt,
      unlockable: outputDTO.unlockable,
      is_pinned: outputDTO.isPinned,
    };
    return res.status(200).json(response);
  } catch (err) {
    if (err instanceof HttpError) {
      return res.status(err.statusCode).json({ status: "error", message: err.message });
    }
    return res.status(500).json({ status: "error", message: "Internal server error." });
  }
};

// バッジのピン留め解除
export const unpinBadgeController = async (req: Request<{ id: string }>, res: Response) => {
  const inputDTO = {
    badgeId: req.params.id,
    userId: getUserIdFromToken(req.cookies.rtoken),
  };

  try {
    const outputDTO = await unpinBadgeService(inputDTO);
    const response: UnpinBadgeResponse = {
      status: "ok",
      badge_id: outputDTO.badgeId,
      name: outputDTO.name,
      description: outputDTO.description,
      image_type: outputDTO.imageType as "bow" | "cat" | "crown" | "gem" | "horse" | "shield" | "sword",
      frame_color: outputDTO.frameColor as "bronze" | "silver" | "gold",
      obtained_at: outputDTO.obtainedAt,
      unlockable: outputDTO.unlockable,
      is_pinned: outputDTO.isPinned,
    };
    return res.status(200).json(response);
  } catch (err) {
    if (err instanceof HttpError) {
      return res.status(err.statusCode).json({ status: "error", message: err.message });
    }
    return res.status(500).json({ status: "error", message: "Internal server error." });
  }
};
