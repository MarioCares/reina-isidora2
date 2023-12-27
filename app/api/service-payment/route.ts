import { NextResponse } from "next/server";
import { getErrorMessage } from "@/utils/Errors";
import { prisma } from "@/lib/prisma";
import { ServicePayment } from "@prisma/client";
import { IServicePaymentWithTotalAmount } from "@/interfaces/pagos-servicio/Agreggations";

export async function GET(): Promise<
  NextResponse<IServicePaymentWithTotalAmount>
> {
  const servicePayments: ServicePayment[] =
    await prisma.servicePayment.findMany({
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

export async function POST(req: Request) {
  try {
    const servicePayment = await req.json();
    const newServicePayment = await prisma.servicePayment.create({
      data: servicePayment,
    });
    return new NextResponse(JSON.stringify(newServicePayment), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        status: "error",
        message: getErrorMessage(error),
      }),
      { status: 500 }
    );
  }
}
