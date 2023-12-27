import { NextRequest, NextResponse } from "next/server";
import { ServicePayment } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { getErrorMessage } from "@/utils/Errors";

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

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: number } }
): Promise<Response> {
  try {
    await prisma.servicePayment.delete({
      where: {
        id: Number(params.id),
      },
    });
    return new NextResponse(JSON.stringify({ status: "ok" }), {
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
