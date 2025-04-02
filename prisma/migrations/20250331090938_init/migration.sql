-- CreateTable
CREATE TABLE "Train" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Compartment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "trainId" INTEGER NOT NULL,
    CONSTRAINT "Compartment_trainId_fkey" FOREIGN KEY ("trainId") REFERENCES "Train" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Seat" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "comparmentId" INTEGER NOT NULL,
    "seatNumber" INTEGER NOT NULL,
    "available" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "Seat_comparmentId_fkey" FOREIGN KEY ("comparmentId") REFERENCES "Compartment" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
