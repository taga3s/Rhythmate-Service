import { Prisma, PrismaClient } from "@prisma/client";
import { User } from "./types";
import { prisma } from "../../db/db";
import { getUpdatedLevelAndExp } from "../funcs/exp";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { PrismaClientWithTx } from "../../db/types";

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

  public async createWithTx(
    name: string,
    email: string,
    passwordHash: string,
    tx: Omit<
      PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
      "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends"
    >,
  ): Promise<User> {
    const user: Prisma.UserCreateInput = {
      name: name,
      email: email,
      passwordHash: passwordHash,
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

  public async updateExp(id: string, currentExp: number, expIncrement: number): Promise<User> {
    const { updatedLevel, updatedExp } = getUpdatedLevelAndExp(currentExp, expIncrement);
    const updatedUser: Prisma.UserUpdateInput = {
      exp: updatedExp,
      level: updatedLevel,
    };
    const result = await prisma.user.update({
      where: {
        id: id,
      },
      data: updatedUser,
    });
    return result;
  }
}
