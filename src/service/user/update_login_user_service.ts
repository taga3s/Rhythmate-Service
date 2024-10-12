import { prisma } from "../../db/db";
import { admin } from "../../pkg/firebase/config";
import { getDownloadURL } from "firebase-admin/storage";
import { UserModel } from "../../model/user/user_model";
import { now } from "../../utils/dayjs";

export const updateLoginUserService = (inputDTO: {
  userId: string;
  name: string;
  imageSrc: string;
}) => {
  return prisma.$transaction(async (tx) => {
    const userModel = new UserModel();
    const bucketName = process.env.FIREBASE_STORAGE_BUCKET_URL;
    const bucket = admin.storage().bucket(bucketName);

    let fileUrl = "";

    if (inputDTO.imageSrc.includes("data:image")) {
      const fileData = inputDTO.imageSrc.replace(/^data:\w+\/\w+;base64,/, "");
      const decodedFile = Buffer.from(fileData, "base64");
      const fileExtension = inputDTO.imageSrc
        .toString()
        .slice(inputDTO.imageSrc.indexOf("/") + 1, inputDTO.imageSrc.indexOf(";"));
      const contentType = inputDTO.imageSrc
        .toString()
        .slice(inputDTO.imageSrc.indexOf(":") + 1, inputDTO.imageSrc.indexOf(";"));

      const filePath = `profile/${inputDTO.userId}/${now()}.${fileExtension}`;
      const file = bucket.file(filePath);

      await file.save(decodedFile, {
        metadata: {
          contentType: contentType,
        },
      });

      const fileRef = bucket.file(filePath);
      fileUrl = await getDownloadURL(fileRef);
    } else {
      fileUrl = inputDTO.imageSrc;
    }

    const user = await userModel.updateWithTx({
      id: inputDTO.userId,
      name: inputDTO.name,
      imageUrl: fileUrl,
      tx,
    });

    return {
      name: user.name,
      email: user.email,
      exp: user.exp,
      level: user.level,
      imageUrl: user.profileImageUrl,
    };
  });
};
