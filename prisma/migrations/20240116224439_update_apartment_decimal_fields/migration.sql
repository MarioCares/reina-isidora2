/*
  Warnings:

  - You are about to alter the column `prorating` on the `apartments` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,9)` to `Decimal(10,5)`.
  - You are about to alter the column `mts2` on the `apartments` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,9)` to `Decimal(10,5)`.

*/
-- AlterTable
ALTER TABLE "apartments" ALTER COLUMN "prorating" SET DATA TYPE DECIMAL(10,5),
ALTER COLUMN "mts2" SET DATA TYPE DECIMAL(10,5);
