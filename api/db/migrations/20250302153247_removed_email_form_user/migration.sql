/*
  Warnings:

  - You are about to drop the column `email` on the `UserExample` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserExample" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "coach" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_UserExample" ("coach", "id", "name") SELECT "coach", "id", "name" FROM "UserExample";
DROP TABLE "UserExample";
ALTER TABLE "new_UserExample" RENAME TO "UserExample";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
