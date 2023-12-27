import { ServicePayment } from "@prisma/client";

export interface IServicePaymentWithTotalAmount {
  servicePayments: ServicePayment[];
  totalAmount: number;
}
