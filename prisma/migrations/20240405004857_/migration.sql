/*
  Warnings:

  - Added the required column `publishedAt` to the `BadgeDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `revisedAt` to the `BadgeDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `BadgeDetail` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Badge" ADD COLUMN     "unlockable" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "BadgeDetail" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "publishedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "revisedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
