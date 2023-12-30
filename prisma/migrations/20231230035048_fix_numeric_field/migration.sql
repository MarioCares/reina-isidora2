/*
  Warnings:

  - You are about to alter the column `afpPercent` on the `Worker` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,9)` to `Decimal(10,2)`.
  - You are about to alter the column `healthPercent` on the `Worker` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,9)` to `Decimal(10,2)`.

*/
-- AlterTable
ALTER TABLE "Worker" ALTER COLUMN "afpPercent" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "healthPercent" SET DATA TYPE DECIMAL(10,2);
