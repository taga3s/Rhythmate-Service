/*
  Warnings:

  - You are about to drop the `BadgeList` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "BadgeList";

-- CreateTable
CREATE TABLE "BadgeDetail" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageType" TEXT NOT NULL,

    CONSTRAINT "BadgeDetail_pkey" PRIMARY KEY ("id")
);
