import { PrismaClient, Prisma } from '@prisma/client'
const prisma = new PrismaClient()

// モデル投入用のデータ定義
const weeklyReportData: Prisma.WeeklyReportCreateInput[] = [
    {
      id: "1",
      completedQuests: 3,
      failedQuests: 2,
      completedPercentage: 60.0,
      completedDays: 1,
      completedQuestsEachDay: [1, 2, 3],
      startDate: new Date(),
      endDate: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
      user: {
        connect: {
          id: "8fa4f0b8-c51e-4e09-ae52-ec2ecf248ea0" // サインアップ済みのユーザIDを指定
        },
      }
    },
    {
      id: "2",
      completedQuests: 35,
      failedQuests: 2,
      completedPercentage: 60.0,
      completedDays: 1,
      completedQuestsEachDay: [1, 2, 3],
      startDate: new Date(),
      endDate: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
      user: {
        connect: {
          id: "8fa4f0b8-c51e-4e09-ae52-ec2ecf248ea0" // サインアップ済みのユーザIDを指定
        },
      }
    },
    {
      id: "3",
      completedQuests: 39,
      failedQuests: 2,
      completedPercentage: 60.0,
      completedDays: 1,
      completedQuestsEachDay: [1, 2, 3],
      startDate: new Date(),
      endDate: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
      user: {
        connect: {
          id: "8fa4f0b8-c51e-4e09-ae52-ec2ecf248ea0"
        },
      }
    },

]
const transfer = async () => {
    for (const data of weeklyReportData) {
        const user = await prisma.weeklyReport.create({
            data,
        })
        console.log(`Created weeklyReport with id: ${user.id}`)
    }
}

// 定義されたデータを実際のモデルへ登録する処理
const main = async () => {
    console.log(`Start seeding ...`)

    await transfer();

    console.log(`Seeding finished.`)
}

// 処理開始
main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })