/*
  Warnings:

  - You are about to drop the column `summary` on the `WeeklyReport` table. All the data in the column will be lost.
  - Made the column `profileImageUrl` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "profileImageUrl" SET NOT NULL;

-- AlterTable
ALTER TABLE "WeeklyReport" DROP COLUMN "summary",
ADD COLUMN     "feedBack" TEXT NOT NULL DEFAULT '';
