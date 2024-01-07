import { ServicePayment } from "@prisma/client";
import { ServicePaymentType } from ".prisma/client";

export interface IServicePaymentWithTotalAmount {
  servicePayments: ServicePayment[];
  totalAmount: number;
}

export interface IGroupedByTypeServicePayment {
  servicePaymentType: ServicePaymentType;
  sum: number;
}
