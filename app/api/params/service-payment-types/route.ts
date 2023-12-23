import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse<Record<string, string>>> {
  return NextResponse.json({
    PAGO: "PAGO",
    CGE: "Electricidad - CGE",
    AGUAALTIPLANO: "Agua - Aguas del Altiplano",
  });
}
