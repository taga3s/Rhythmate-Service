import { userModel } from "../../model/user/user_model";

export const updateLoginUserService = async (inputDTO: { userId: string; name: string }) => {
  const model = userModel;

  const user = await model.update(inputDTO.userId, inputDTO.name);

  return {
    name: user.name,
    email: user.email,
    level: user.level,
  };
};
