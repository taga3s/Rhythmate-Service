import { Prisma, PrismaClient } from "@prisma/client";
import { Tag } from "./types";

const prisma = new PrismaClient();

const create = async (name: string, userId: string): Promise<Tag> => {
  const tag: Prisma.TagCreateInput = {
    name: name,
    user: {
      connect: {
        id: userId,
      },
    }
  };
  const result = await prisma.tag.create({ data: tag });
  return result;
};

const update = async (
  id: string,
  name: string,
  updatedAt: Date,
): Promise<Tag> => {
  const tag: Prisma.TagUpdateInput = {
    name: name,
    updatedAt: updatedAt,
  };

  const result = await prisma.tag.update({ where: { id: id }, data: tag });
  return result;
};

const getById = async (id: string): Promise<Tag | null> => {
  const result = await prisma.tag.findFirst({
    where: {
      id: id,
    },
  });
  return result;
};

const getByUserId = async (userId: string): Promise<Tag[]> => {
  const result = await prisma.tag.findMany({
    where: {
      userId: userId,
    },
  });
  return result;
};

const deleteById = async (id: string): Promise<Tag | null> => {
  const result = await prisma.tag.delete({ where: { id: id } });
  return result;
};

export const tagModel = {
  create,
  update,
  getById,
  getByUserId,
  deleteById,
};
