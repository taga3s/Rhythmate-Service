import { userModel } from "../../model/user/user_model";
import { HttpError } from "../../pkg/httpError";

export const getLoginUserService = async (inputDTO: { userId: string }) => {
  const model = userModel;

  const user = await model.getById(inputDTO.userId);
  if (!user) {
    throw new HttpError("クライアントの値が不正です。", 400);
  }

  return {
    name: user.name,
    email: user.email,
    exp: user.exp,
    level: user.level,
  };
};
