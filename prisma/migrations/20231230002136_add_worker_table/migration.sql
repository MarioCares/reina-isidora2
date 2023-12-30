-- CreateEnum
CREATE TYPE "BankAccountType" AS ENUM ('CTACTE', 'CTAVISTA', 'CTARUT', 'OTRO');

-- CreateTable
CREATE TABLE "Worker" (
    "id" SERIAL NOT NULL,
    "rutDNI" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "jobTitle" TEXT NOT NULL,
    "startAt" TIMESTAMP(3) NOT NULL,
    "bankAccount" TEXT NOT NULL,
    "bank" TEXT NOT NULL,
    "bankAccountType" "BankAccountType" NOT NULL DEFAULT 'OTRO',
    "afpName" TEXT NOT NULL,
    "afpPercent" DECIMAL(10,9) NOT NULL DEFAULT 0,
    "healthName" TEXT NOT NULL,
    "healthPercent" DECIMAL(10,9) NOT NULL DEFAULT 0,
    "baseHourAmount" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Worker_pkey" PRIMARY KEY ("id")
);
