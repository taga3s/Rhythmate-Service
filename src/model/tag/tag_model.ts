import { Prisma } from "@prisma/client";
import { prisma } from "../../db/db";
import { Tag } from "./types";

export class TagModel {
  public async create(name: string, userId: string): Promise<Tag> {
    const tag: Prisma.TagCreateInput = {
      name: name,
      user: {
        connect: {
          id: userId,
        },
      },
    };
    const result = await prisma.tag.create({ data: tag });
    return result;
  }

  public async update(id: string, name: string, updatedAt: Date): Promise<Tag> {
    const tag: Prisma.TagUpdateInput = {
      name: name,
      updatedAt: updatedAt,
    };
    const result = await prisma.tag.update({ where: { id: id }, data: tag });
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

  public async getByUserId(userId: string): Promise<Tag[]> {
    const result = await prisma.tag.findMany({
      where: {
        userId: userId,
      },
    });
    return result;
  }

  public async deleteById(id: string): Promise<Tag | null> {
    const result = await prisma.tag.delete({ where: { id: id } });
    return result;
  }
}
