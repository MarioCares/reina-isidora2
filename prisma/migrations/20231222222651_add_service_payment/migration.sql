-- CreateEnum
CREATE TYPE "ServicePaymentType" AS ENUM ('PAGO', 'CGE', 'AGUAALTIPLANO');

-- CreateTable
CREATE TABLE "ServicePayment" (
    "id" SERIAL NOT NULL,
    "servicePaymentType" "ServicePaymentType" NOT NULL DEFAULT 'PAGO',
    "documentId" TEXT NOT NULL,
    "expireAt" TIMESTAMP(3) NOT NULL,
    "paymentAt" TIMESTAMP(3) NOT NULL,
    "amount" INTEGER NOT NULL,
    "observation" TEXT NOT NULL,
    "file" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ServicePayment_pkey" PRIMARY KEY ("id")
);
