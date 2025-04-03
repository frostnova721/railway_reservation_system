/*
  Warnings:

  - You are about to drop the `Booking` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Journey` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Station` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Stop` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `type` on the `Train` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumber` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Booking_bookingReference_key";

-- DropIndex
DROP INDEX "Station_code_key";

-- DropIndex
DROP INDEX "Stop_journeyId_stationId_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Booking";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Journey";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Station";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Stop";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Seat" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "compartmentId" INTEGER NOT NULL,
    "seatNumber" INTEGER NOT NULL,
    "available" BOOLEAN NOT NULL DEFAULT true,
    "bookedBy" INTEGER,
    CONSTRAINT "Seat_compartmentId_fkey" FOREIGN KEY ("compartmentId") REFERENCES "Compartment" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Seat_bookedBy_fkey" FOREIGN KEY ("bookedBy") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Seat" ("available", "compartmentId", "id", "seatNumber") SELECT "available", "compartmentId", "id", "seatNumber" FROM "Seat";
DROP TABLE "Seat";
ALTER TABLE "new_Seat" RENAME TO "Seat";
CREATE TABLE "new_Train" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);
INSERT INTO "new_Train" ("id", "name") SELECT "id", "name" FROM "Train";
DROP TABLE "Train";
ALTER TABLE "new_Train" RENAME TO "Train";
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_User" ("email", "id", "isAdmin", "name", "password") SELECT "email", "id", "isAdmin", "name", "password" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
