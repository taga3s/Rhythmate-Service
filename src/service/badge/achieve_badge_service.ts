import { prisma } from "../../db/db";
import { BadgeModel } from "../../model/badge/badge_model";
import { BadgeDetailModel } from "../../model/badgeDetail/badge_detail_model";
import { HttpError } from "../../pkg/httpError";

export const achieveBadgeService = async (inputDTO: {
  badgeId: string;
  userId: string;
}) => {
  return prisma.$transaction(async (tx) => {
    const badgeModel = new BadgeModel();
    const badgeDetailModel = new BadgeDetailModel();

    const badgeDetail = await badgeDetailModel.getById(inputDTO.badgeId);
    if (!badgeDetail) {
      throw new HttpError("バッジ詳細が見つかりません", 400);
    }

    const targetBadge = await badgeModel.getByBadgeIdAndUserId(inputDTO.badgeId, inputDTO.userId);
    if (!targetBadge) {
      throw new HttpError("バッジが見つかりません", 500);
    }

    const updatedBadge = await badgeModel.achieveWithTx(targetBadge.id, tx);

    return {
      badgeId: updatedBadge.badgeId,
      name: badgeDetail.name,
      description: badgeDetail.description,
      image_type: badgeDetail.imageType,
      frame_color: badgeDetail.frameColor,
      obtainedAt: updatedBadge.obtainedAt,
      isPinned: updatedBadge.isPinned,
    };
  });
};
