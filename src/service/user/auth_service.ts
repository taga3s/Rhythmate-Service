import { prisma } from "../../db/db";
import { admin } from "../../pkg/firebase/config";
import { UserModel } from "../../model/user/user_model";
import { WeeklyReportModel } from "../../model/weeklyReport/weekly_report_model";
import { HttpError } from "../../utils/httpError";
import { getStartAndEndUTCDateTime } from "../../utils/datetime";

type InputDTO = { id_token: string };

export const authService = async (inputDTO: InputDTO) => {
  return prisma.$transaction(async (tx) => {
    const userModel = new UserModel();
    const weeklyReportModel = new WeeklyReportModel();

    // id_tokenを検証する
    const decodeValue = await admin.auth().verifyIdToken(inputDTO.id_token);
    if (!decodeValue) {
      throw new HttpError("認証に失敗しました。", 401);
    }

    const verifiedUser = await admin.auth().getUser(decodeValue.uid);
    const name = verifiedUser.displayName;
    const email = verifiedUser.email;
    const imageUrl = verifiedUser.photoURL ?? "";
    if (!name || !email) {
      throw new HttpError("認証に失敗しました。", 401);
    }

    const user = await userModel.getByEmail({
      email,
    });
    if (user) {
      return {
        id: user.id,
        email: user.email,
        imageUrl: user.profileImageUrl ? user.profileImageUrl : "",
      };
    }

    const newUser = await userModel.createWithTx({
      name,
      email,
      photoUrl: imageUrl,
      tx,
    });
    const completedQuests = 0;
    const failedQuests = 0;
    const failedQuestsEachDay = [0, 0, 0, 0, 0, 0, 0];
    const completedDays = 0;
    const completedQuestsEachDay = [0, 0, 0, 0, 0, 0, 0];
    const { startUTC: startDate, endUTC: endDate } = getStartAndEndUTCDateTime();
    const newWeeklyReport = await weeklyReportModel.createWithTx({
      completedQuests,
      failedQuests,
      streakDays: completedDays,
      completedQuestsEachDay,
      failedQuestsEachDay,
      startDate,
      endDate,
      userId: newUser.id,
      tx,
    });

    return {
      id: newUser.id,
      email: newUser.email,
      imageUrl: newUser.profileImageUrl,
    };
  });
};
