import { Prisma } from "@prisma/client";
import { User } from "./types";
import { prisma } from "../../db/db";
import { getUpdatedLevelAndExp } from "../funcs/exp";

const getById = async (id: string): Promise<User | null> => {
  const result = await prisma.user.findFirst({
    where: {
      id: id,
    },
  });
  return result;
};

const getByEmail = async (email: string): Promise<User | null> => {
  const result = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });
  return result;
};

const create = async (name: string, email: string, passwordHash: string): Promise<User> => {
  const user: Prisma.UserCreateInput = {
    name: name,
    email: email,
    passwordHash: passwordHash,
  };
  const result = await prisma.user.create({ data: user });
  return result;
};

const update = async (id: string, name: string): Promise<User> => {
  const user: Prisma.UserUpdateInput = {
    name: name,
  };
  const result = await prisma.user.update({
    where: {
      id: id,
    },
    data: user,
  });
  return result;
};

const updateExp = async (id: string, currentExp: number, expIncrement: number): Promise<User> => {
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
};

export const userModel = {
  getById,
  getByEmail,
  create,
  update,
  updateExp,
};
