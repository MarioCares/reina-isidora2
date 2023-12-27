import { NextResponse } from "next/server";
import { serviceTypes } from "@/utils/Strings";
import { ServicePaymentType } from ".prisma/client";

export async function GET(): Promise<NextResponse<any>> {
  return NextResponse.json(
    Object.values(ServicePaymentType).map((value) => {
      return {
        value,
        label: serviceTypes[value] ?? "Otro",
      };
    })
  );
}
