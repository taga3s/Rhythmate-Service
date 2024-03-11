import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// モデル投入用のデータ定義
const userData: Prisma.UserCreateInput[] = [
  {
    id: "8fa4f0b8-c51e-4e09-ae52-ec2ecf248ea0",
    name: "175cm69kg",
    email: "test@gmail.com",
    passwordHash: "password-hash",
  },
];

const questData: Prisma.QuestCreateInput[] = [
  {
    id: "a9c8a7cb-32a8-4906-b7b0-673c39aec631",
    title: "筋トレ",
    description: "腕立て伏せを100回する",
    startsAt: "9:00:00",
    startedAt: "NOT_STARTED_YET",
    minutes: 15,
    tagId: "workout",
    difficulty: "NORMAL",
    state: "INACTIVE",
    isSucceeded: false,
    continuationLevel: 1,
    startDate: "2024/2/25 9:00:00",
    endDate: "2024/2/25 9:00:00",
    days: ["MON", "TUE", "THU", "FRI", "SUN"],
    weeklyFrequency: 5,
    weeklyCompletionCount: 0,
    totalCompletionCount: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    user: {
      connect: {
        id: "8fa4f0b8-c51e-4e09-ae52-ec2ecf248ea0", // サインアップ済みのユーザIDを指定
      },
    },
  },
  {
    id: "fad4aa19-a797-4ba5-a5ff-e145e1619fcf",
    title: "朝ご飯",
    description: "バナナとプロテインを飲む",
    startsAt: "8:00:00",
    startedAt: "NOT_STARTED_YET",
    minutes: 15,
    tagId: "health",
    difficulty: "EASY",
    state: "INACTIVE",
    isSucceeded: false,
    continuationLevel: 1,
    startDate: "2024/2/25 9:00:00",
    endDate: "2024/2/25 9:00:00",
    days: ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"],
    weeklyFrequency: 5,
    weeklyCompletionCount: 0,
    totalCompletionCount: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    user: {
      connect: {
        id: "8fa4f0b8-c51e-4e09-ae52-ec2ecf248ea0", // サインアップ済みのユーザIDを指定
      },
    },
  },
];

const weeklyReportData: Prisma.WeeklyReportCreateInput[] = [
  {
    id: "1",
    completedQuests: 3,
    failedQuests: 2,
    completedPercentage: 60.0,
    completedDays: 1,
    completedQuestsEachDay: [1, 2, 3, 4, 5, 6, 7],
    startDate: "2024/2/25 9:00:00",
    endDate: "2024/2/26 0:00:00",
    createdAt: new Date(),
    updatedAt: new Date(),
    user: {
      connect: {
        id: "8fa4f0b8-c51e-4e09-ae52-ec2ecf248ea0", // サインアップ済みのユーザIDを指定
      },
    },
  },
  {
    id: "2",
    completedQuests: 35,
    failedQuests: 2,
    completedPercentage: 60.0,
    completedDays: 1,
    completedQuestsEachDay: [1, 2, 3, 0, 0, 0, 0],
    startDate: "2024/2/26 9:00:00",
    endDate: "2024/3/1 0:00:00",
    createdAt: new Date(),
    updatedAt: new Date(),
    user: {
      connect: {
        id: "8fa4f0b8-c51e-4e09-ae52-ec2ecf248ea0", // サインアップ済みのユーザIDを指定
      },
    },
  },
  {
    id: "3",
    completedQuests: 39,
    failedQuests: 2,
    completedPercentage: 60.0,
    completedDays: 1,
    completedQuestsEachDay: [1, 2, 3, 0, 0, 0, 0],
    startDate: "2024/3/2 9:00:00",
    endDate: "2024/3/9 0:00:00",
    createdAt: new Date(),
    updatedAt: new Date(),
    user: {
      connect: {
        id: "8fa4f0b8-c51e-4e09-ae52-ec2ecf248ea0",
      },
    },
  },
];
const transfer = async () => {
  for (const data of userData) {
    // ユーザデータを登録
    const user = await prisma.user.create({
      data,
    });
    console.log(`Created user with id: ${user.id}`);
  }
  for (const data of questData) {
    // クエストデータを登録
    const user = await prisma.quest.create({
      data,
    });
    console.log(`Created quest with id: ${user.id}`);
  }
  for (const data of weeklyReportData) {
    // 週次レポートを登録
    const user = await prisma.weeklyReport.create({
      data,
    });
    console.log(`Created weeklyReport with id: ${user.id}`);
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
