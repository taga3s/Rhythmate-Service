import bcrypt from "bcrypt";
import { UserModel } from "../../model/user/user_model";
import { WeeklyReportModel } from "../../model/weeklyReport/weekly_report_model";
import { HttpError } from "../../pkg/httpError";

export const signupService = async (inputDTO: {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}) => {
  const userModel = new UserModel();
  const weeklyReportModel = new WeeklyReportModel();

  const existingUser = await userModel.getByEmail(inputDTO.email);
  if (existingUser !== null) {
    throw new HttpError("そのEmailは既に使用されています。", 400);
  }

  if (inputDTO.password !== inputDTO.password_confirmation) {
    throw new HttpError("パスワードが再確認用のパスワードと異なっています。", 400);
  }

  const passwordHash = await bcrypt.hash(inputDTO.password, 10);

  const user = await userModel.create(inputDTO.name, inputDTO.email, passwordHash);

  // サインアップ時に週次レポートの初回作成をする
  await weeklyReportModel.create(0, 0, 0, [0, 0, 0, 0, 0, 0, 0], user.id);

  return {
    name: user.name,
    email: user.email,
    level: user.level,
  };
};
