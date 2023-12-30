/*
  Warnings:

  - Added the required column `apartmentOwnerResponsableName` to the `apartments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `apartmentOwnerResponsablePhoneNumber` to the `apartments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `emergencyContactName` to the `apartments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `emergencyContactPhoneNumber` to the `apartments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `parkingNumber` to the `apartments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `parkingRol` to the `apartments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rol` to the `apartments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `storageNumber` to the `apartments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `storageRol` to the `apartments` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ParkingFloor" AS ENUM ('SUPERIOR', 'SUBTERANEO');

-- AlterTable
ALTER TABLE "apartments" ADD COLUMN     "apartmentOwnerResponsableName" TEXT NOT NULL,
ADD COLUMN     "apartmentOwnerResponsablePhoneNumber" TEXT NOT NULL,
ADD COLUMN     "emergencyContactName" TEXT NOT NULL,
ADD COLUMN     "emergencyContactPhoneNumber" TEXT NOT NULL,
ADD COLUMN     "mts2" DECIMAL(10,9) NOT NULL DEFAULT 0,
ADD COLUMN     "parking" "ParkingFloor" NOT NULL DEFAULT 'SUPERIOR',
ADD COLUMN     "parkingNumber" INTEGER NOT NULL,
ADD COLUMN     "parkingRol" TEXT NOT NULL,
ADD COLUMN     "rol" TEXT NOT NULL,
ADD COLUMN     "storageNumber" INTEGER NOT NULL,
ADD COLUMN     "storageRol" TEXT NOT NULL;
