import { NextRequest, NextResponse } from "next/server";
import { Worker } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { getErrorMessage } from "@/utils/Errors";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: number } }
): Promise<NextResponse<Worker>> {
  const worker = await prisma.worker.findFirst({
    where: {
      id: Number(params.id),
    },
  });
  if (worker) return NextResponse.json(worker);
  return new NextResponse(
    JSON.stringify({
      status: "error",
      message: "Trabajador no existe",
    }),
    { status: 404 }
  );
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: number } }
): Promise<NextResponse<Worker>> {
  try {
    const worker = await request.json();
    const updated = await prisma.worker.update({
      where: {
        id: Number(params.id),
      },
      data: worker,
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
