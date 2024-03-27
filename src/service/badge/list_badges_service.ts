import { BadgeModel } from "../../model/badge/badge_model";
import { HttpError } from "../../pkg/httpError";

export const listBadgesService = async (inputDTO: { userId: string }) => {
  const badgeModel = new BadgeModel();

  const badges = await badgeModel.listByUserId(inputDTO.userId);
  if (badges === null) {
    throw new HttpError("バッジが見つかりませんでした", 500);
  }

  return {
    badges: badges,
  };
};
