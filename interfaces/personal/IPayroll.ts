import { Prisma } from "@prisma/client";

export interface IHeaderPayroll {
  id?: number;
  workerId: number;
  payrollAt: string;
  workedDays: number;
  absenceDays: number;
  hours100: number;
  hours50: number;
  payAdvance: number;
}

export type PayrollWithWorker = Prisma.PayrollGetPayload<{
  include: { worker: true };
}>;
