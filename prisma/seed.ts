import { Prisma, PrismaClient } from "@prisma/client";
import { badgeListData, questData, userData, weeklyReportData } from "./seed_inputs";
const prisma = new PrismaClient();

const transfer = async () => {
  // ユーザデータを登録
  for (const data of userData) {
    const user = await prisma.user.create({
      data,
    });
    console.log(`Created user with id: ${user.id}`);
  }
  // クエストデータを登録
  for (const data of questData) {
    const user = await prisma.quest.create({
      data,
    });
    console.log(`Created quest with id: ${user.id}`);
  }
  // 週次レポートを登録
  for (const data of weeklyReportData) {
    const user = await prisma.weeklyReport.create({
      data,
    });
    console.log(`Created weeklyReport with id: ${user.id}`);
  }
  // バッジリストを登録
  for (const data of badgeListData) {
    const user = await prisma.badgeList.create({
      data,
    });
    console.log(`Created badge with id: ${user.id}`);
  }
};

// 定義されたデータを実際のモデルへ登録する処理
const main = async () => {
  console.log(`Start seeding ...`);

  await transfer();

  console.log(`Seeding finished.`);
};

// 処理開始
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
