import { userModel } from "../../model/user/user_model"
import bcrypt from "bcrypt"
import { CustomError } from "../../pkg/customError";

export const loginService = async (inputDTO: { email: string, password: string }) => {
  const model = userModel;

  const user = await model.getByEmail(inputDTO.email);
  if (!user) {
    throw new CustomError("メールアドレスかパスワードが間違っています。", 400)
  }

  const compared = await bcrypt.compare(inputDTO.password, user.passwordHash)

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    level: user.email
  }
}