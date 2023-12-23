import { ServicePaymentType } from ".prisma/client";

export interface IAddServicePayment {
  id?: number;
  servicePaymentType: ServicePaymentType;
  documentId: string;
  expireAt: string;
  paymentAt?: string;
  amount: number;
  observation: string;
  file?: string;
}
