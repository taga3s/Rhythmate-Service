import { prisma } from "../../db/db";
import { BadgeModel } from "../../model/badge/badge_model";
import { BadgeDetailModel } from "../../model/badgeDetail/badge_detail_model";
import { UserModel } from "../../model/user/user_model";
import { HttpError } from "../../pkg/httpError";

export const achieveBadgeService = async (inputDTO: {
  badgeId: string;
  userId: string;
}) => {
  return prisma.$transaction(async (tx) => {
    const badgeModel = new BadgeModel();
    const badgeDetailModel = new BadgeDetailModel();
    const userModel = new UserModel();

    const badgeDetail = await badgeDetailModel.getById(inputDTO.badgeId);
    if (!badgeDetail) {
      throw new HttpError("バッジ詳細が見つかりません", 400);
    }
    const user = await userModel.getById(inputDTO.userId);
    if (!user) {
      throw new HttpError("ユーザーが見つかりません", 400);
    }

    const badge = await badgeModel.achieveWithTx(inputDTO.badgeId, inputDTO.userId, tx);

    return {
      id: badge.id,
      badgeId: badge.badgeId,
      obtainedAt: badge.obtainedAt,
      isPinned: badge.isPinned,
    };
  });
};
