import { NextResponse } from "next/server";
import { serviceTypes } from "@/utils/Strings";
import { ServicePaymentType } from ".prisma/client";
import { IMapString } from "@/interfaces/IMap";

export async function GET(): Promise<NextResponse<IMapString[]>> {
  return NextResponse.json(
    Object.values(ServicePaymentType).map((value) => {
      return {
        value,
        label: serviceTypes[value] ?? "Otro",
      };
    })
  );
}
