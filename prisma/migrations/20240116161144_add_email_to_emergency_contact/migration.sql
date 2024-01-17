/*
  Warnings:

  - Added the required column `emergencyContactEmail` to the `apartments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "apartments" ADD COLUMN     "emergencyContactEmail" TEXT NOT NULL;
