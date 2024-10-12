import { BadgeModel } from "../../model/badge/badge_model";
import { BadgeDetailModel } from "../../model/badgeDetail/badge_detail_model";

export const listBadgesService = async (inputDTO: { userId: string }) => {
  const badgeModel = new BadgeModel();
  const badgeDetailModel = new BadgeDetailModel();

  const badges = await badgeModel.listByUserId({ userId: inputDTO.userId });
  const badgesMasterData = await badgeDetailModel.listAll();

  const badgesWithDetail = badgesMasterData.map((badgeDetail) => {
    const badge = badges.find((badge) => badge.badgeId === badgeDetail.id);
    return {
      id: badgeDetail.id,
      name: badgeDetail.name,
      description: badgeDetail.description,
      imageType: badgeDetail.imageType,
      frameColor: badgeDetail.frameColor,
      unlockable: badge ? badge.unlockable : false,
      obtainedAt: badge ? badge.obtainedAt : "",
      isPinned: badge ? badge.isPinned : false,
    };
  });

  return {
    badgesWithDetail: badgesWithDetail,
  };
};
