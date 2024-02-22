import { userModel } from "../../model/user/user_model"
import { CustomError } from "../../pkg/customError";

export const getLoginUserService = async (inputDTO: { user_id: string }) => {
  const model = userModel;

  const user = await model.getById(inputDTO.user_id)
  if (!user) {
    throw new CustomError("クライアントの値が不正です。", 400)
  }

  return {
    name: user.name,
    email: user.email,
    level: user.level
  }
}