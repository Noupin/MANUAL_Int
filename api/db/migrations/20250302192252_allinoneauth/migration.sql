/*
  Warnings:

  - You are about to drop the `UserCredential` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN "resetToken" TEXT;
ALTER TABLE "User" ADD COLUMN "resetTokenExpiresAt" DATETIME;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "UserCredential";
PRAGMA foreign_keys=on;

-- CreateIndex
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");
