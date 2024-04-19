/*
  Warnings:

  - You are about to drop the column `completedDays` on the `WeeklyReport` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "WeeklyReport" DROP COLUMN "completedDays",
ADD COLUMN     "streakDays" INTEGER NOT NULL DEFAULT 0;
