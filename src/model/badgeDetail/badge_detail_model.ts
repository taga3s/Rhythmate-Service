import { Prisma } from "@prisma/client";
import { PrismaClientWithTx } from "../../db/types";
import { BadgeDetail } from "./type";
import { prisma } from "../../db/db";

export class BadgeDetailModel {
  public async createWithTx(
    name: string,
    description: string,
    imageType: string,
    frameColor: string,
    tx: PrismaClientWithTx,
  ): Promise<BadgeDetail> {
    const badgeDetail: Prisma.BadgeDetailCreateInput = {
      name: name,
      description: description,
      imageType: imageType,
      frameColor: frameColor,
      publishedAt: "",
      revisedAt: "",
    };
    const result = await tx.badgeDetail.create({ data: badgeDetail });
    return result;
  }

  public async updateWithTx(
    id: string,
    name: string,
    description: string,
    imageType: string,
    frameColor: string,
    tx: PrismaClientWithTx,
  ): Promise<BadgeDetail | null> {
    const badgeDetail: Prisma.BadgeDetailUpdateInput = {
      name: name,
      description: description,
      imageType: imageType,
      frameColor: frameColor,
    };
    const result = await tx.badgeDetail.update({
      where: { id: id },
      data: badgeDetail,
    });
    return result;
  }

  public async deleteWithTx(id: string, tx: PrismaClientWithTx): Promise<BadgeDetail | null> {
    const result = await tx.badgeDetail.delete({
      where: { id: id },
    });
    return result;
  }

  public async getById(id: string): Promise<BadgeDetail | null> {
    const result = await prisma.badgeDetail.findFirst({
      where: {
        id: id,
      },
    });
    return result;
  }

  public async listAll() {
    const result = await prisma.badgeDetail.findMany();
    return result;
  }
}
