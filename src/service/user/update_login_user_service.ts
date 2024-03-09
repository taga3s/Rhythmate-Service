import { UserModel } from "../../model/user/user_model";

export const updateLoginUserService = async (inputDTO: { userId: string; name: string }) => {
  const userModel = new UserModel();

  const user = await userModel.update(inputDTO.userId, inputDTO.name);

  return {
    name: user.name,
    email: user.email,
    exp: user.exp,
    level: user.level,
  };
};
