/*
  Warnings:

  - Added the required column `hashedPassword` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "UserCredential" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "hashedPassword" TEXT NOT NULL,
    "salt" TEXT,
    "resetToken" TEXT,
    "resetTokenExpiresAt" DATETIME,
    CONSTRAINT "UserCredential_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "hashedPassword" TEXT NOT NULL,
    "salt" TEXT,
    "coach" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_User" ("coach", "id", "name") SELECT "coach", "id", "name" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "UserCredential_userId_key" ON "UserCredential"("userId");
