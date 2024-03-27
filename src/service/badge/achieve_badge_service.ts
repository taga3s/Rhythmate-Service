import { prisma } from "../../db/db";
import { BadgeModel } from "../../model/badge/badge_model";

export const achieveBadgeService = async (inputDTO: {
  badgeId: string;
  userId: string;
}) => {
  return prisma.$transaction(async (tx) => {
    const model = new BadgeModel();

    const badge = await model.achieveWithTx(inputDTO.badgeId, inputDTO.userId, tx);

    return {
      id: badge.id,
      badgeId: badge.badgeId,
      obtainedAt: badge.obtainedAt,
      isPinned: badge.isPinned,
    };
  });
};
