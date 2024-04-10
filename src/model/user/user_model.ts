import { Prisma } from "@prisma/client";
import { prisma } from "../../db/db";
import { PrismaClientWithTx } from "../../db/types";
import { getUpdatedLevelAndExp } from "../funcs/exp";
import { User } from "./types";

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

  public async createWithTx(name: string, email: string, tx: PrismaClientWithTx): Promise<User> {
    const user: Prisma.UserCreateInput = {
      name: name,
      email: email,
      profileImageUrl: "",
    };
    const result = await tx.user.create({ data: user });
    return result;
  }

  public async updateWithTx(id: string, name: string, tx: PrismaClientWithTx): Promise<User> {
    const user: Prisma.UserUpdateInput = {
      name: name,
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
}
