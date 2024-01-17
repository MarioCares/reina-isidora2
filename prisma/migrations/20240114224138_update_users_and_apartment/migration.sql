/*
  Warnings:

  - Added the required column `apartmentOwnerResponsableEmail` to the `apartments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `notes` to the `apartments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "apartments" ADD COLUMN     "apartmentOwnerResponsableEmail" TEXT NOT NULL,
ADD COLUMN     "notes" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "birthAt" DATE;
