import { userModel } from "../../model/user/user_model"

export const updateLoginUserService = async (inputDTO: { user_id: string, name: string }) => {
  const model = userModel;

  const user = await model.update(inputDTO.user_id, inputDTO.name)

  return {
    name: user.name,
    email: user.email,
    level: user.level
  }
}