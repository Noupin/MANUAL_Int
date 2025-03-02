/*
  Warnings:

  - Made the column `salt` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "hashedPassword" TEXT NOT NULL,
    "salt" TEXT NOT NULL,
    "resetToken" TEXT,
    "resetTokenExpiresAt" DATETIME,
    "coach" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_User" ("coach", "hashedPassword", "id", "name", "resetToken", "resetTokenExpiresAt", "salt") SELECT "coach", "hashedPassword", "id", "name", "resetToken", "resetTokenExpiresAt", "salt" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
