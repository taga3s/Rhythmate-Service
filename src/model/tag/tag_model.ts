import { Prisma } from "@prisma/client";
import { prisma } from "../../db/db";
import { PrismaClientWithTx } from "../../db/types";
import { Tag } from "./types";

export class TagModel {
  public async createWithTx({
    name,
    color,
    userId,
    tx,
  }: {
    name: string;
    color: string;
    userId: string;
    tx: PrismaClientWithTx;
  }): Promise<Tag> {
    const tag: Prisma.TagCreateInput = {
      name: name,
      color: color,
      user: {
        connect: {
          id: userId,
        },
      },
    };
    const result = await tx.tag.create({ data: tag });
    return result;
  }

  public async updateWithTx({
    id,
    name,
    color,
    tx,
  }: {
    id: string;
    name: string;
    color: string;
    tx: PrismaClientWithTx;
  }): Promise<Tag> {
    const tag: Prisma.TagUpdateInput = {
      name: name,
      color: color,
    };
    const result = await tx.tag.update({ where: { id: id }, data: tag });
    return result;
  }

  public async getById({
    id,
  }: {
    id: string;
  }): Promise<Tag | null> {
    const result = await prisma.tag.findFirst({
      where: {
        id: id,
      },
    });
    return result;
  }

  public async listByUserId({
    userId,
  }: {
    userId: string;
  }): Promise<Tag[]> {
    const result = await prisma.tag.findMany({
      where: {
        userId: userId,
      },
    });
    return result;
  }

  public async deleteByIdWithTx({
    id,
    tx,
  }: {
    id: string;
    tx: PrismaClientWithTx;
  }): Promise<Tag> {
    const result = await tx.tag.delete({ where: { id: id } });
    return result;
  }
}
