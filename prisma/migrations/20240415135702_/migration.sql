/*
  Warnings:

  - You are about to drop the column `completedDays` on the `WeeklyReport` table. All the data in the column will be lost.
  - Made the column `profileImageUrl` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "profileImageUrl" SET NOT NULL;

-- AlterTable
ALTER TABLE "WeeklyReport" DROP COLUMN "completedDays",
ADD COLUMN     "streakDays" INTEGER NOT NULL DEFAULT 0;
