import cron from "node-cron";
import { logger } from "../pkg/logger";
import { prisma } from "../db/db";
import { microCMSClient } from "../microcms/client";
import { ListBadgesDetail } from "../microcms/types";

const upsertEverySunday = async () => {
  const scheduledTime = process.env.CRON_TZ === "UTC" ? "0 0 15 * * 0" : "0 0 0 * * 1";

  cron.schedule(scheduledTime, async () => {
    const response: ListBadgesDetail = await microCMSClient.get({ endpoint: "badges-detail" });

    await prisma.$transaction(async (tx) => {
      logger.info("Running cron job for upserting badges every Sunday.");
      for (const badge of response.contents) {
        await tx.badgeDetail.upsert({
          create: {
            id: badge.id,
            name: badge.name,
            description: badge.description,
            imageType: badge.image_type,
            frameColor: badge.frame_color,
            createdAt: badge.createdAt,
            updatedAt: badge.updatedAt,
            publishedAt: badge.publishedAt,
            revisedAt: badge.revisedAt,
          },
          update: {
            name: badge.name,
            description: badge.description,
            imageType: badge.image_type,
            frameColor: badge.frame_color,
            createdAt: badge.createdAt,
            updatedAt: badge.updatedAt,
            publishedAt: badge.publishedAt,
            revisedAt: badge.revisedAt,
          },
          where: {
            id: badge.id,
          },
        });
      }
    });
  });
};

export const badgeCronJob = {
  upsertEverySunday,
};
