import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { PayrollWithWorker } from "@/interfaces/personal/IPayroll";
import { Worker } from "@prisma/client";
import { getErrorMessage } from "@/utils/Errors";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: number } }
): Promise<NextResponse<PayrollWithWorker>> {
  const payroll = await prisma.payroll.findFirst({
    where: {
      id: Number(params.id),
    },
    include: {
      worker: true,
    },
  });
  if (payroll) return new NextResponse(JSON.stringify(payroll));
  return new NextResponse(
    JSON.stringify({
      status: "error",
      message: "Liquidación no existe",
    }),
    { status: 404 }
  );
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: number } }
): Promise<NextResponse<Worker>> {
  try {
    const payroll = await request.json();
    const updated = await prisma.payroll.update({
      where: {
        id: Number(params.id),
      },
      data: payroll,
    });
    return new NextResponse(JSON.stringify(updated), {
      status: 200,
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
