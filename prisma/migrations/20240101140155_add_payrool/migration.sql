-- AlterTable
ALTER TABLE "Worker" ADD COLUMN     "isActive" BOOLEAN DEFAULT true;

-- CreateTable
CREATE TABLE "PayrollItem" (
    "id" SERIAL NOT NULL,
    "isEarning" BOOLEAN NOT NULL,
    "isDeduction" BOOLEAN NOT NULL,
    "isTaxable" BOOLEAN NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "PayrollItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payroll" (
    "id" SERIAL NOT NULL,
    "payrollAt" DATE NOT NULL,
    "workerId" INTEGER NOT NULL,
    "workedDays" INTEGER NOT NULL,
    "absenceDays" INTEGER NOT NULL,
    "hours100" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "hours50" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Payroll_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PayrollDetail" (
    "id" SERIAL NOT NULL,
    "payrollId" INTEGER NOT NULL,
    "payrollItemId" INTEGER NOT NULL,

    CONSTRAINT "PayrollDetail_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Payroll" ADD CONSTRAINT "Payroll_workerId_fkey" FOREIGN KEY ("workerId") REFERENCES "Worker"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "PayrollDetail" ADD CONSTRAINT "PayrollDetail_payrollId_fkey" FOREIGN KEY ("payrollId") REFERENCES "Payroll"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PayrollDetail" ADD CONSTRAINT "PayrollDetail_payrollItemId_fkey" FOREIGN KEY ("payrollItemId") REFERENCES "PayrollItem"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
