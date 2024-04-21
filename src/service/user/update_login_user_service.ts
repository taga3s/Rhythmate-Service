import { prisma } from "../../db/db";
import { admin } from "../../firebase/config";
import { getDownloadURL } from "firebase-admin/storage";
import { UserModel } from "../../model/user/user_model";
import { now } from "../../pkg/dayjs";

export const updateLoginUserService = (inputDTO: {
  userId: string;
  name: string;
  imageBinary: string;
}) => {
  return prisma.$transaction(async (tx) => {
    const userModel = new UserModel();
    const bucketName = process.env.FIREBASE_STORAGE_BUCKET_URL;
    const bucket = admin.storage().bucket(bucketName);

    if (inputDTO.imageBinary === "") {
      const user = await userModel.updateWithTx(tx, inputDTO.userId, inputDTO.name);
      return {
        name: user.name,
        email: user.email,
        exp: user.exp,
        level: user.level,
        imageUrl: user.profileImageUrl,
      };
    }

    const fileData = inputDTO.imageBinary.replace(/^data:\w+\/\w+;base64,/, "");
    const decodedFile = Buffer.from(fileData, "base64");
    const fileExtension = inputDTO.imageBinary
      .toString()
      .slice(inputDTO.imageBinary.indexOf("/") + 1, inputDTO.imageBinary.indexOf(";"));
    const contentType = inputDTO.imageBinary
      .toString()
      .slice(inputDTO.imageBinary.indexOf(":") + 1, inputDTO.imageBinary.indexOf(";"));

    const filePath = `profile/${inputDTO.userId}/${now()}.${fileExtension}`;
    const file = bucket.file(filePath);

    await file.save(decodedFile, {
      metadata: {
        contentType: contentType,
      },
    });

    const fileRef = bucket.file(filePath);
    const downloadURL = await getDownloadURL(fileRef);

    const user = await userModel.updateWithTx(tx, inputDTO.userId, inputDTO.name, downloadURL);

    return {
      name: user.name,
      email: user.email,
      exp: user.exp,
      level: user.level,
      imageUrl: user.profileImageUrl,
    };
  });
};
