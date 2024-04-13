import { prisma } from "../../../db/db";
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
    const stage1BadgeDetail = await badgeDetailModel.getByFeatures(
      features.stage1.imageType,
      features.stage1.frameColor,
    );
    if (!stage1BadgeDetail) {
      throw new HttpError("指定されたバッジのデータが見つかりません。", 500);
    }

    const existedBadge = await badgeModel.getByBadgeIdAndUserId(stage1BadgeDetail.id, userId);
    if (!existedBadge) {
      await badgeModel.createWithTx(stage1BadgeDetail.id, userId, tx);
    }
  }

  // bow, silver
  if (features.stage2.totalQuestsNum <= totalQuestsNum) {
    const stage2BadgeDetail = await badgeDetailModel.getByFeatures(
      features.stage2.imageType,
      features.stage2.frameColor,
    );
    if (!stage2BadgeDetail) {
      throw new HttpError("指定されたバッジのデータが見つかりません。", 500);
    }

    const existedBadge = await badgeModel.getByBadgeIdAndUserId(stage2BadgeDetail.id, userId);
    if (!existedBadge) {
      await badgeModel.createWithTx(stage2BadgeDetail.id, userId, tx);
    }
  }

  // bow, gold
  if (features.stage3.totalQuestsNum <= totalQuestsNum) {
    const stage3BadgeDetail = await badgeDetailModel.getByFeatures(
      features.stage3.imageType,
      features.stage3.frameColor,
    );
    if (!stage3BadgeDetail) {
      throw new HttpError("指定されたバッジのデータが見つかりません。", 500);
    }

    const existedBadge = await badgeModel.getByBadgeIdAndUserId(stage3BadgeDetail.id, userId);
    if (!existedBadge) {
      await badgeModel.createWithTx(stage3BadgeDetail.id, userId, tx);
    }
  }
};
