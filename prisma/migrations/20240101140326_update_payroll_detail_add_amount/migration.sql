/*
  Warnings:

  - Added the required column `amount` to the `PayrollDetail` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PayrollDetail" ADD COLUMN     "amount" INTEGER NOT NULL;
