import { NextRequest, NextResponse } from "next/server";
import { ServicePayment } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { ServicePaymentType } from ".prisma/client";
import { IServicePaymentWithTotalAmount } from "@/interfaces/pagos-servicio/Agreggations";

export async function GET(
  request: NextRequest,
  { params }: { params: { type: string } }
): Promise<NextResponse<IServicePaymentWithTotalAmount>> {
  const servicePayments: ServicePayment[] =
    await prisma.servicePayment.findMany({
      where: {
        servicePaymentType: params.type as ServicePaymentType,
      },
      orderBy: {
        expireAt: "desc",
      },
    });

  const withTotal = servicePayments.reduce((accumulate, servicePayment) => {
    return accumulate + servicePayment.amount;
  }, 0);
  return NextResponse.json({
    servicePayments,
    totalAmount: withTotal,
  } as IServicePaymentWithTotalAmount);
}
