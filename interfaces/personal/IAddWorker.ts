import { BankAccountType } from "@prisma/client";

export interface IWorker {
  id?: number;
  name: string;
  afpName: string;
  bank: string;
  healthName: string;
  baseHourAmount: number;
  bankAccount: string;
  rutDNI: string;
  jobTitle: string;
  afpPercent: number;
  bankAccountType: BankAccountType;
  healthPercent: number;
  startAt: string;
}
