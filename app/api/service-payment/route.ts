import { NextRequest, NextResponse } from "next/server";
import { getErrorMessage } from "@/utils/Errors";
import { prisma } from "@/lib/prisma";
import {
  IGroupedByTypeServicePayment,
  IServicePaymentWithTotalAmount,
} from "@/interfaces/pagos-servicio/Agreggations";
import { ServicePaymentService } from "@/services/back/ServicePaymentService";

export async function GET(
  request: NextRequest
): Promise<
  NextResponse<IServicePaymentWithTotalAmount | IGroupedByTypeServicePayment[]>
> {
  const grouped = request.nextUrl.searchParams.get("grouped");
  const yearMonth = request.nextUrl.searchParams.get("yearMonth");
  if (grouped === null) {
    return NextResponse.json(await ServicePaymentService.getAll());
  } else {
    return NextResponse.json(
      await ServicePaymentService.getGroupedByType(yearMonth)
    );
  }
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
