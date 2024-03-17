import { Prisma } from "@prisma/client";
import { prisma } from "../../db/db";
import { PrismaClientWithTx } from "../../db/types";
import { Tag } from "./types";

export class TagModel {
  public async createWithTx(name: string, userId: string, tx: PrismaClientWithTx): Promise<Tag> {
    const tag: Prisma.TagCreateInput = {
      name: name,
      user: {
        connect: {
          id: userId,
        },
      },
    };
    const result = await tx.tag.create({ data: tag });
    return result;
  }

  public async updateWithTx(id: string, name: string, updatedAt: Date, tx: PrismaClientWithTx): Promise<Tag> {
    const tag: Prisma.TagUpdateInput = {
      name: name,
      updatedAt: updatedAt,
    };
    const result = await tx.tag.update({ where: { id: id }, data: tag });
    return result;
  }

  public async getById(id: string): Promise<Tag | null> {
    const result = await prisma.tag.findFirst({
      where: {
        id: id,
      },
    });
    return result;
  }

  public async listByUserId(userId: string): Promise<Tag[]> {
    const result = await prisma.tag.findMany({
      where: {
        userId: userId,
      },
    });
    return result;
  }

  public async deleteByIdWithTx(id: string, tx: PrismaClientWithTx): Promise<Tag | null> {
    const result = await tx.tag.delete({ where: { id: id } });
    return result;
  }
}
