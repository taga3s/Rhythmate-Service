import bcrypt from "bcrypt";
import { UserModel } from "../../model/user/user_model";
import { WeeklyReportModel } from "../../model/weeklyReport/weekly_report_model";
import { HttpError } from "../../pkg/httpError";
import { prisma } from "../../db/db";

export const signupService = (inputDTO: {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}) => {
  return prisma.$transaction(async (tx) => {
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

    const user = await userModel.createWithTx(inputDTO.name, inputDTO.email, passwordHash, tx);

    // サインアップ時に週次レポートの初回作成をする
    await weeklyReportModel.createWithTx(0, 0, 0, [0, 0, 0, 0, 0, 0, 0], user.id, tx);

    return {
      name: user.name,
      email: user.email,
      level: user.level,
    };
  });
};
