import { Prisma } from "@prisma/client";
import { prisma } from "../../db/db";
import { PrismaClientWithTx } from "../../db/types";
import { User } from "./types";
import { getUpdatedLevelAndExp } from "../../funcs/exp";

export class UserModel {
  public async getById(id: string): Promise<User | null> {
    const result = await prisma.user.findFirst({
      where: {
        id: id,
      },
    });
    return result;
  }

  public async getByEmail(email: string): Promise<User | null> {
    const result = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    return result;
  }

  public async createWithTx(name: string, email: string, photoUrl: string, tx: PrismaClientWithTx): Promise<User> {
    const user: Prisma.UserCreateInput = {
      name: name,
      email: email,
      profileImageUrl: photoUrl,
    };
    const result = await tx.user.create({ data: user });
    return result;
  }

  public async updateWithTx(tx: PrismaClientWithTx, id: string, name: string, imageUrl?: string): Promise<User> {
    const user: Prisma.UserUpdateInput = {
      name: name,
      ...(imageUrl && { profileImageUrl: imageUrl }),
    };
    const result = await tx.user.update({
      where: {
        id: id,
      },
      data: user,
    });
    return result;
  }

  public async updateExpWithTx(
    id: string,
    currentExp: number,
    expIncrement: number,
    tx: PrismaClientWithTx,
  ): Promise<User> {
    const { updatedLevel, updatedExp } = getUpdatedLevelAndExp(currentExp, expIncrement);
    const updatedUser: Prisma.UserUpdateInput = {
      exp: updatedExp,
      level: updatedLevel,
    };
    const result = await tx.user.update({
      where: {
        id: id,
      },
      data: updatedUser,
    });
    return result;
  }

  public async deleteWithTx(id: string, tx: PrismaClientWithTx): Promise<User> {
    const result = await tx.user.delete({
      where: {
        id: id,
      },
    });
    return result;
  }
}
