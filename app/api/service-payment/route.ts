import { NextResponse } from "next/server";
import { getErrorMessage } from "@/utils/Errors";
import { prisma } from "@/lib/prisma";
import { ServicePayment } from "@prisma/client";

export async function GET(): Promise<NextResponse<ServicePayment[]>> {
  const servicePayments: ServicePayment[] =
    await prisma.servicePayment.findMany({
      orderBy: {
        expireAt: "desc",
      },
    });
  return NextResponse.json(servicePayments);
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
