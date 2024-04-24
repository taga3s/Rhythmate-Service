import { prisma } from "../../db/db";
import { UserModel } from "../../model/user/user_model";

export const deleteUserService = (inputDTO: { userId: string }) => {
  return prisma.$transaction(async (tx) => {
    const userModel = new UserModel();

    const user = await userModel.deleteWithTx(inputDTO.userId, tx);

    return {
      name: user.name,
      email: user.email,
      exp: user.exp,
      level: user.level,
      imageUrl: user.profileImageUrl,
    };
  });
};
