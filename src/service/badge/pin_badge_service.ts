import { prisma } from "../../db/db";
import { BadgeModel } from "../../model/badge/badge_model";
import { HttpError } from "../../pkg/httpError";

type InputDTO = { id: string };

export const pinBadgeService = async (inputDTO: InputDTO) => {
  return prisma.$transaction(async (tx) => {
    const badgeModel = new BadgeModel();

    const badge = await badgeModel.getById(inputDTO.id);
    if (!badge) {
      throw new HttpError("指定したidのバッジが存在しません", 400);
    }

    // バッジがすでにピン止めされている場合は、エラーを返す
    if (badge.isPinned) {
      throw new HttpError("すでにピン止めされているバッジです", 400);
    }

    // バッジがすでに３つピン止めされている場合は、エラーを返す
    const pinnedBadges = await badgeModel.listPinnedByUserId(badge.userId);
    if (pinnedBadges && pinnedBadges.length == 3) {
      throw new HttpError("ピン止めできるバッジは３つまでです", 400);
    }

    const pinnedBadge = await badgeModel.pinByIdWithTx(inputDTO.id, tx);
    if (!pinnedBadge) {
      throw new HttpError("バッジのピン止めに失敗しました", 500);
    }

    // バッジの詳細を取得
    const badgeDetail = await prisma.badgeDetail.findFirst({
      where: {
        id: badge.badgeId,
      },
    });
    if (!badgeDetail) {
      throw new HttpError("バッジ詳細が見つかりませんでした", 500);
    }

    return {
      id: pinnedBadge.id,
      badgeId: pinnedBadge.badgeId,
      name: badgeDetail.name,
      description: badgeDetail.description,
      imageType: badgeDetail.imageType,
      obtainedAt: pinnedBadge.obtainedAt,
      isPinned: pinnedBadge.isPinned,
    };
  });
};
