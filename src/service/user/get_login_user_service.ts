import { userModel } from "../../model/user/user_model"
import { CustomError } from "../../pkg/customError";

export const getLoginUserService = async (inputDTO: { userId: string }) => {
  const model = userModel;

  const user = await model.getById(inputDTO.userId)
  if (!user) {
    throw new CustomError("クライアントの値が不正です。", 400)
  }

  return {
    name: user.name,
    email: user.email,
    level: user.level
  }
}