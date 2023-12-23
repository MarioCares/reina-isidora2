import { NextRequest, NextResponse } from "next/server";
import { ServicePayment } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: number } }
): Promise<NextResponse<ServicePayment>> {
  const id = params.id;
  const servicePayment: ServicePayment | null =
    await prisma.servicePayment.findFirst({
      where: {
        id: Number(id),
      },
    });
  if (servicePayment) return NextResponse.json(servicePayment);
  return new NextResponse(
    JSON.stringify({
      status: "error",
      message: "Documento no existe",
    }),
    { status: 404 }
  );
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: number } }
): Promise<NextResponse<ServicePayment>> {
  const servicePayment = await request.json();
  const updated = await prisma.servicePayment.update({
    where: {
      id: Number(params.id),
    },
    data: servicePayment,
  });
  return new NextResponse(JSON.stringify(updated), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
