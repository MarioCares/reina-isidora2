import { ServicePayment } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import {
  IGroupedByTypeServicePayment,
  IServicePaymentWithTotalAmount,
} from "@/interfaces/pagos-servicio/Agreggations";

const getAll = async (): Promise<IServicePaymentWithTotalAmount> => {
  const servicePayments: ServicePayment[] =
    await prisma.servicePayment.findMany({
      orderBy: {
        expireAt: "desc",
      },
    });
  const withTotal = servicePayments.reduce((accumulate, servicePayment) => {
    return accumulate + servicePayment.amount;
  }, 0);
  return {
    servicePayments,
    totalAmount: withTotal,
  } as IServicePaymentWithTotalAmount;
};

const getGroupedByType = async (
  yearMonth: string | null
): Promise<IGroupedByTypeServicePayment[]> => {
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, "0");
  const date = yearMonth ?? `${year}-${month}`;
  return prisma.$queryRaw<
    IGroupedByTypeServicePayment[]
  >`select "servicePaymentType", sum(amount)::Int from "ServicePayment" sp where TO_CHAR(sp."expireAt", 'yyyy-mm') = ${date} group by "servicePaymentType" `;
};

export const ServicePaymentService = {
  getAll,
  getGroupedByType,
};
