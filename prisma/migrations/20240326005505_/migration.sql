/*
  Warnings:

  - You are about to drop the column `endDate` on the `Quest` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `Quest` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Quest" DROP COLUMN "endDate",
DROP COLUMN "startDate";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "profileImageUrl" TEXT;

-- CreateTable
CREATE TABLE "Badge" (
    "id" TEXT NOT NULL,
    "badgeId" TEXT NOT NULL,
    "obtainedAt" TEXT NOT NULL,
    "isPinned" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Badge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BadgeList" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageDir" TEXT NOT NULL,

    CONSTRAINT "BadgeList_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Badge" ADD CONSTRAINT "Badge_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
