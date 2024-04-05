import { prisma } from "../../db/db";
import { BadgeModel } from "../../model/badge/badge_model";
import { HttpError } from "../../pkg/httpError";

type InputDTO = { badgeId: string; userId: string };

export const unpinBadgeService = async (inputDTO: InputDTO) => {
  return prisma.$transaction(async (tx) => {
    const badgeModel = new BadgeModel();

    const badge = await badgeModel.getByBadgeIdAndUserId(inputDTO.badgeId, inputDTO.userId);
    if (!badge) {
      throw new HttpError("指定したidのバッジが存在しません", 400);
    }
    // バッジがすでにピン止めされていない場合は、エラーを返す
    if (!badge.isPinned) {
      throw new HttpError("ピン止めされていないバッジです", 400);
    }

    const unpinnedBadge = await badgeModel.unpinByIdWithTx(badge.id, tx);
    if (!unpinnedBadge) {
      throw new HttpError("バッジのピン止め解除に失敗しました", 500);
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
      id: unpinnedBadge.id,
      badgeId: unpinnedBadge.badgeId,
      name: badgeDetail.name,
      description: badgeDetail.description,
      imageType: badgeDetail.imageType,
      obtainedAt: unpinnedBadge.obtainedAt,
      isPinned: unpinnedBadge.isPinned,
    };
  });
};
