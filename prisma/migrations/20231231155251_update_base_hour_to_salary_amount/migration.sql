/*
  Warnings:

  - You are about to drop the column `baseHourAmount` on the `Worker` table. All the data in the column will be lost.
  - Added the required column `salaryAmount` to the `Worker` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Worker" DROP COLUMN "baseHourAmount",
ADD COLUMN     "salaryAmount" INTEGER NOT NULL;
