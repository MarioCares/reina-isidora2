import { NextResponse } from "next/server";
import { bankAccountTypes } from "@/utils/Strings";
import { BankAccountType } from "@prisma/client";
import { IMapString } from "@/interfaces/IMap";

export async function GET(): Promise<NextResponse<IMapString[]>> {
  return NextResponse.json(
    Object.values(BankAccountType).map((value) => {
      return {
        value,
        label: bankAccountTypes[value] ?? "Otro",
      };
    })
  );
}
