import { NextRequest, NextResponse } from "next/server";
import { ServicePayment } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { ServicePaymentType } from ".prisma/client";

export async function GET(
  request: NextRequest,
  { params }: { params: { type: string } }
): Promise<NextResponse<ServicePayment[]>> {
  const servicePayments: ServicePayment[] =
    await prisma.servicePayment.findMany({
      where: {
        servicePaymentType: params.type as ServicePaymentType,
      },
      orderBy: {
        expireAt: "desc",
      },
    });
  return NextResponse.json(servicePayments);
}
