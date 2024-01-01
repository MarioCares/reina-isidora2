import { NextRequest, NextResponse } from "next/server";
import { Payroll } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: number } }
): Promise<NextResponse<Payroll[]>> {
  const payrolls = await prisma.payroll.findMany({
    where: {
      workerId: Number(params.id),
    },
  });
  return new NextResponse(JSON.stringify(payrolls));
}
