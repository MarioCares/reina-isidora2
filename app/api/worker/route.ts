import { NextResponse } from "next/server";
import { getErrorMessage } from "@/utils/Errors";
import { prisma } from "@/lib/prisma";
import { Worker } from "@prisma/client";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const worker = await prisma.worker.create({
      data,
    });
    return NextResponse.json(worker);
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

export async function GET(): Promise<NextResponse<Worker[]>> {
  const workers: Worker[] = await prisma.worker.findMany();

  return NextResponse.json(workers);
}
