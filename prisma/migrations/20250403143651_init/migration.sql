/*
  Warnings:

  - You are about to drop the column `bookedBy` on the `Seat` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "Station" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "city" TEXT,
    "state" TEXT
);

-- CreateTable
CREATE TABLE "Journey" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "trainId" INTEGER NOT NULL,
    "originId" INTEGER NOT NULL,
    "destinationId" INTEGER NOT NULL,
    "departureDateTime" DATETIME NOT NULL,
    "arrivalDateTime" DATETIME NOT NULL,
    "distance" REAL,
    "status" TEXT,
    CONSTRAINT "Journey_trainId_fkey" FOREIGN KEY ("trainId") REFERENCES "Train" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Journey_originId_fkey" FOREIGN KEY ("originId") REFERENCES "Station" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Journey_destinationId_fkey" FOREIGN KEY ("destinationId") REFERENCES "Station" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Stop" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "journeyId" INTEGER NOT NULL,
    "stationId" INTEGER NOT NULL,
    "arrivalDateTime" DATETIME NOT NULL,
    "departureDateTime" DATETIME NOT NULL,
    "stopNumber" INTEGER NOT NULL,
    CONSTRAINT "Stop_journeyId_fkey" FOREIGN KEY ("journeyId") REFERENCES "Journey" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Stop_stationId_fkey" FOREIGN KEY ("stationId") REFERENCES "Station" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Booking" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "journeyId" INTEGER NOT NULL,
    "seatId" INTEGER NOT NULL,
    "bookingDateTime" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL,
    "bookingReference" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "paymentStatus" TEXT NOT NULL,
    CONSTRAINT "Booking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Booking_journeyId_fkey" FOREIGN KEY ("journeyId") REFERENCES "Journey" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Booking_seatId_fkey" FOREIGN KEY ("seatId") REFERENCES "Seat" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

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
INSERT INTO "new_Seat" ("available", "compartmentId", "id", "seatNumber") SELECT "available", "compartmentId", "id", "seatNumber" FROM "Seat";
DROP TABLE "Seat";
ALTER TABLE "new_Seat" RENAME TO "Seat";
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "phoneNumber" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_User" ("email", "id", "isAdmin", "name", "password") SELECT "email", "id", "isAdmin", "name", "password" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Station_code_key" ON "Station"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Stop_journeyId_stationId_key" ON "Stop"("journeyId", "stationId");

-- CreateIndex
CREATE UNIQUE INDEX "Booking_bookingReference_key" ON "Booking"("bookingReference");
