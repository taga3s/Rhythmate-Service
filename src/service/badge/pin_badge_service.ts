import { prisma } from "../../db/db";
import { BadgeModel } from "../../model/badge/badge_model";
import { HttpError } from "../../pkg/httpError";

type InputDTO = { badgeId: string; userId: string };

export const pinBadgeService = async (inputDTO: InputDTO) => {
  return prisma.$transaction(async (tx) => {
    const badgeModel = new BadgeModel();

    const badge = await badgeModel.getByBadgeIdAndUserId(inputDTO.badgeId, inputDTO.userId);
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

    const pinnedBadge = await badgeModel.pinByIdWithTx(badge.id, tx);
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
      frameColor: badgeDetail.frameColor,
      obtainedAt: pinnedBadge.obtainedAt,
      unlockable: pinnedBadge.unlockable,
      isPinned: pinnedBadge.isPinned,
    };
  });
};
