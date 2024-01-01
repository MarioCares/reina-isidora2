import { NextRequest, NextResponse } from "next/server";
import { getErrorMessage } from "@/utils/Errors";
import { prisma } from "@/lib/prisma";
import { Payroll } from "@prisma/client";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const payroll = await prisma.payroll.create({
      data,
    });
    return NextResponse.json(payroll);
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

export async function GET(
  request: NextRequest
): Promise<NextResponse<Payroll[]>> {
  const addCalculated = request.nextUrl.searchParams.get("addCalculated");
  const payrolls = await prisma.payroll.findMany({
    where: addCalculated === null ? { isCalculated: false } : undefined,
  });

  return new NextResponse(JSON.stringify(payrolls));
}
