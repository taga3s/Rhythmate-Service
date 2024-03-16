import { prisma } from "../../db/db";
import { UserModel } from "../../model/user/user_model";

export const updateLoginUserService = (inputDTO: { userId: string; name: string }) => {
  return prisma.$transaction(async (tx) => {
    const userModel = new UserModel();

    const user = await userModel.updateWithTx(inputDTO.userId, inputDTO.name, tx);

    return {
      name: user.name,
      email: user.email,
      exp: user.exp,
      level: user.level,
    };
  });
};
