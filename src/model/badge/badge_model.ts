import { Prisma } from "@prisma/client";
import { prisma } from "../../db/db";
import { PrismaClientWithTx } from "../../db/types";
import { Badge } from "./types";
import { now } from "../../pkg/dayjs";

export class BadgeModel {
  public async achieveWithTx(badgeId: string, userId: string, tx: PrismaClientWithTx): Promise<Badge> {
    const badge: Prisma.BadgeCreateInput = {
      badgeId: badgeId,
      obtainedAt: now(),
      isPinned: false,
      user: {
        connect: {
          id: userId,
        },
      },
    };
    const result = await tx.badge.create({ data: badge });
    return result;
  }

  public async listByUserId(userId: string): Promise<Badge[] | null> {
    const result = await prisma.badge.findMany({
      where: {
        userId: userId,
      },
    });
    return result;
  }

  public async pinByIdWithTx(id: string, tx: PrismaClientWithTx): Promise<Badge | null> {
    const badge: Prisma.BadgeUpdateInput = {
      isPinned: true,
    };
    const result = await tx.badge.update({
      where: { id: id },
      data: badge,
    });
    return result;
  }
}
