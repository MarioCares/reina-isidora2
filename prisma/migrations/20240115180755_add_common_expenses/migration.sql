-- CreateEnum
CREATE TYPE "PaymentType" AS ENUM ('EFECTIVO', 'CHEQUE', 'TRANSFERENCIA');

-- CreateTable
CREATE TABLE "CommonExpensesDebt" (
    "id" SERIAL NOT NULL,
    "apartmentId" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "debtAmount" INTEGER,

    CONSTRAINT "CommonExpensesDebt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommonExpenses" (
    "id" SERIAL NOT NULL,
    "paymentAt" TIMESTAMP(3) NOT NULL,
    "apartmentId" INTEGER NOT NULL,
    "payBy" TEXT NOT NULL,
    "referenceMonth" DATE NOT NULL,
    "paymentAmount" INTEGER NOT NULL,
    "paymentType" "PaymentType" NOT NULL DEFAULT 'EFECTIVO',
    "bank" TEXT NOT NULL,
    "registerById" TEXT NOT NULL,
    "documentUrl" TEXT,
    "receipt" INTEGER,
    "observation" TEXT,
    "checkNumber" TEXT,

    CONSTRAINT "CommonExpenses_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CommonExpensesDebt" ADD CONSTRAINT "CommonExpensesDebt_apartmentId_fkey" FOREIGN KEY ("apartmentId") REFERENCES "apartments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommonExpenses" ADD CONSTRAINT "CommonExpenses_apartmentId_fkey" FOREIGN KEY ("apartmentId") REFERENCES "apartments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommonExpenses" ADD CONSTRAINT "CommonExpenses_registerById_fkey" FOREIGN KEY ("registerById") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
