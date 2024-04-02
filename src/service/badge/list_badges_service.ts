import { BadgeModel } from "../../model/badge/badge_model";
import { BadgeDetailModel } from "../../model/badgeDetail/badge_detail_model";
import { HttpError } from "../../pkg/httpError";

export const listBadgesService = async (inputDTO: { userId: string }) => {
  const badgeModel = new BadgeModel();
  const badgeDetailModel = new BadgeDetailModel();

  const badges = await badgeModel.listByUserId(inputDTO.userId);
  if (badges === null) {
    throw new HttpError("バッジが見つかりませんでした", 500);
  }

  const badgesWithDetail = await Promise.all(badges.map( async (badge) => {
    const badgeDetail = await badgeDetailModel.getById(badge.badgeId);
    if (badgeDetail === null) {
      throw new HttpError("バッジ詳細が見つかりませんでした", 500);
    }
    return {
      id: badge.id,
      badgeId: badge.badgeId,
      name: badgeDetail.name,
      description: badgeDetail.description,
      imageType: badgeDetail.imageType,
      obtainedAt: badge.obtainedAt,
      isPinned: badge.isPinned,
      createdAt: badge.createdAt,
      updatedAt: badge.updatedAt,
      userId: badge.userId,
    }
  }));

  return {
    badgesWithDetail: badgesWithDetail,
  };
};
