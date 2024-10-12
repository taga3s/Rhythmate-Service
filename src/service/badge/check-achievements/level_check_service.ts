import { PrismaClientWithTx } from "../../../db/types";
import { BadgeModel } from "../../../model/badge/badge_model";
import { BadgeDetailModel } from "../../../model/badgeDetail/badge_detail_model";
import { HttpError } from "../../../utils/httpError";

const features = {
  stage1: {
    level: 10,
    imageType: "cat",
    frameColor: "bronze",
  },
  stage2: {
    level: 30,
    imageType: "cat",
    frameColor: "silver",
  },
  stage3: {
    level: 50,
    imageType: "cat",
    frameColor: "gold",
  },
};

type InputDTO = {
  level: number;
  userId: string;
};

export const levelCheckService = async (inputDTO: InputDTO, tx: PrismaClientWithTx) => {
  const { userId, level } = inputDTO;
  const badgeModel = new BadgeModel();
  const badgeDetailModel = new BadgeDetailModel();

  // cat, bronze
  if (features.stage1.level <= level) {
    const stage1BadgeDetail = await badgeDetailModel.getByFeatures({
      imageType: features.stage1.imageType,
      frameColor: features.stage1.frameColor,
    });
    if (!stage1BadgeDetail) {
      throw new HttpError("指定されたバッジのデータが見つかりません。", 500);
    }

    const existedBadge = await badgeModel.getByBadgeIdAndUserId({
      badgeId: stage1BadgeDetail.id,
      userId: userId,
    });
    if (!existedBadge) {
      await badgeModel.createWithTx({
        badgeId: stage1BadgeDetail.id,
        userId: userId,
        tx: tx,
      });
    }
  }

  // cat, silver
  if (features.stage2.level <= level) {
    const stage2BadgeDetail = await badgeDetailModel.getByFeatures({
      imageType: features.stage2.imageType,
      frameColor: features.stage2.frameColor,
    });
    if (!stage2BadgeDetail) {
      throw new HttpError("指定されたバッジのデータが見つかりません。", 500);
    }

    const existedBadge = await badgeModel.getByBadgeIdAndUserId({
      badgeId: stage2BadgeDetail.id,
      userId: userId,
    });
    if (!existedBadge) {
      await badgeModel.createWithTx({
        badgeId: stage2BadgeDetail.id,
        userId: userId,
        tx: tx,
      });
    }
  }

  // cat, gold
  if (features.stage3.level <= level) {
    const stage3BadgeDetail = await badgeDetailModel.getByFeatures({
      imageType: features.stage3.imageType,
      frameColor: features.stage3.frameColor,
    });
    if (!stage3BadgeDetail) {
      throw new HttpError("指定されたバッジのデータが見つかりません。", 500);
    }

    const existedBadge = await badgeModel.getByBadgeIdAndUserId({
      badgeId: stage3BadgeDetail.id,
      userId: userId,
    });
    if (!existedBadge) {
      await badgeModel.createWithTx({
        badgeId: stage3BadgeDetail.id,
        userId: userId,
        tx: tx,
      });
    }
  }
};
