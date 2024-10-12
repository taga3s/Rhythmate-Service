import { PrismaClientWithTx } from "../../../db/types";
import { BadgeModel } from "../../../model/badge/badge_model";
import { BadgeDetailModel } from "../../../model/badgeDetail/badge_detail_model";
import { HttpError } from "../../../pkg/httpError";

const features = {
  stage1: {
    totalQuestsNum: 10,
    imageType: "bow",
    frameColor: "bronze",
  },
  stage2: {
    totalQuestsNum: 30,
    imageType: "bow",
    frameColor: "silver",
  },
  stage3: {
    totalQuestsNum: 100,
    imageType: "bow",
    frameColor: "gold",
  },
};

type InputDTO = {
  userId: string;
  totalQuestsNum: number;
};

export const totalQuestsCheckService = async (inputDTO: InputDTO, tx: PrismaClientWithTx) => {
  const { userId, totalQuestsNum } = inputDTO;
  const badgeModel = new BadgeModel();
  const badgeDetailModel = new BadgeDetailModel();

  // bow, bronze
  if (features.stage1.totalQuestsNum <= totalQuestsNum) {
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

  // bow, silver
  if (features.stage2.totalQuestsNum <= totalQuestsNum) {
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

  // bow, gold
  if (features.stage3.totalQuestsNum <= totalQuestsNum) {
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
