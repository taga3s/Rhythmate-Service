import { userModel } from "../../model/user/user_model";
import bcrypt from "bcrypt";
import { HttpError } from "../../pkg/httpError";
import { weeklyReportModel } from "../../model/weeklyReport/weekly_report_model";

export const signupService = async (inputDTO: {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}) => {
  const UserModel = userModel;
  const WeeklyReportModel = weeklyReportModel;

  const existingUser = await UserModel.getByEmail(inputDTO.email);
  if (existingUser !== null) {
    throw new HttpError("そのEmailは既に使用されています。", 400);
  }

  if (inputDTO.password !== inputDTO.password_confirmation) {
    throw new HttpError("パスワードが再確認用のパスワードと異なっています。", 400);
  }

  const passwordHash = await bcrypt.hash(inputDTO.password, 10);

  const user = await UserModel.create(inputDTO.name, inputDTO.email, passwordHash);

  // サインアップ時に週次レポートの初回作成をする
  await WeeklyReportModel.create(0, 0, 0, [0, 0, 0, 0, 0, 0, 0], user.id);

  return {
    name: user.name,
    email: user.email,
    level: user.level,
  };
};
