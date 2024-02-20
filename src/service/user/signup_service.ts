import { userModel } from "../../model/user/user_model"
import bcrypt from "bcrypt"

export const signupService = async (inputDTO: { name: string, email: string, password: string, password_confirmation: string }) => {
  const model = userModel;

  const existedUser = await model.getByEmail(inputDTO.email);
  if (existedUser !== null) {
    throw new CustomError("そのEmailは既に使用されています。", 400)
  }

  if (inputDTO.password !== inputDTO.password_confirmation) {
    throw new CustomError("パスワードが再確認用のパスワードと異なっています。", 400)
  }

  const passwordHash = await bcrypt.hash(inputDTO.password, 10)

  const user = await model.create(inputDTO.name, inputDTO.email, passwordHash)

  return {
    name: user.name,
    email: user.email,
    level: user.level
  }
}