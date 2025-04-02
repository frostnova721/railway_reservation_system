/*
  Warnings:

  - You are about to drop the column `comparmentId` on the `Seat` table. All the data in the column will be lost.
  - Added the required column `compartmentId` to the `Seat` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Seat" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "compartmentId" INTEGER NOT NULL,
    "seatNumber" INTEGER NOT NULL,
    "available" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "Seat_compartmentId_fkey" FOREIGN KEY ("compartmentId") REFERENCES "Compartment" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Seat" ("available", "id", "seatNumber") SELECT "available", "id", "seatNumber" FROM "Seat";
DROP TABLE "Seat";
ALTER TABLE "new_Seat" RENAME TO "Seat";
CREATE TABLE "new_Train" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);
INSERT INTO "new_Train" ("id", "name") SELECT "id", "name" FROM "Train";
DROP TABLE "Train";
ALTER TABLE "new_Train" RENAME TO "Train";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
