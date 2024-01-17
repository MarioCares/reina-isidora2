import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getErrorMessage } from "@/utils/Errors";
import { Worker } from "@prisma/client";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  try {
    const apartment = await prisma.apartment.findFirst({
      where: {
        id: Number(params.id),
      },
    });
    return NextResponse.json(apartment);
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

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: number } }
): Promise<NextResponse<Worker>> {
  try {
    const apartment = await request.json();
    const updated = await prisma.apartment.update({
      where: {
        id: Number(params.id),
      },
      data: apartment,
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
