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
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
