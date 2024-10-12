import { Prisma } from "@prisma/client";
import { prisma } from "../../db/db";
import { PrismaClientWithTx } from "../../db/types";
import { Badge } from "./types";
import { now } from "../../utils/dayjs";

export class BadgeModel {
  public async createWithTx({
    badgeId,
    userId,
    tx,
  }: {
    badgeId: string;
    userId: string;
    tx: PrismaClientWithTx;
  }): Promise<Badge> {
    const data: Prisma.BadgeCreateInput = {
      badgeId: badgeId,
      isPinned: false,
      obtainedAt: "",
      unlockable: true,
      user: {
        connect: {
          id: userId,
        },
      },
    };
    const result = await tx.badge.create({ data: data });
    return result;
  }

  public async achieveWithTx({
    id,
    tx,
  }: {
    id: string;
    tx: PrismaClientWithTx;
  }): Promise<Badge> {
    const result = await tx.badge.update({
      where: { id: id },
      data: {
        obtainedAt: now(),
      },
    });
    return result;
  }

  public async getById({
    id,
  }: {
    id: string;
  }): Promise<Badge | null> {
    const result = await prisma.badge.findFirst({
      where: {
        id: id,
      },
    });
    return result;
  }

  public async getByBadgeIdAndUserId({
    badgeId,
    userId,
  }: {
    badgeId: string;
    userId: string;
  }): Promise<Badge | null> {
    const result = await prisma.badge.findFirst({
      where: {
        badgeId: badgeId,
        userId: userId,
      },
    });
    return result;
  }

  public async listByUserId({
    userId,
  }: {
    userId: string;
  }): Promise<Badge[]> {
    const result = await prisma.badge.findMany({
      where: {
        userId: userId,
      },
    });
    return result;
  }

  public async listPinnedByUserId({
    userId,
  }: {
    userId: string;
  }): Promise<Badge[]> {
    const result = await prisma.badge.findMany({
      where: {
        userId: userId,
        isPinned: true,
      },
    });
    return result;
  }

  public async pinByIdWithTx({
    id,
    tx,
  }: {
    id: string;
    tx: PrismaClientWithTx;
  }): Promise<Badge> {
    const badge: Prisma.BadgeUpdateInput = {
      isPinned: true,
    };
    const result = await tx.badge.update({
      where: { id: id },
      data: badge,
    });
    return result;
  }

  public async unpinByIdWithTx({
    id,
    tx,
  }: {
    id: string;
    tx: PrismaClientWithTx;
  }): Promise<Badge> {
    const badge: Prisma.BadgeUpdateInput = {
      isPinned: false,
    };
    const result = await tx.badge.update({
      where: { id: id },
      data: badge,
    });
    return result;
  }
}
