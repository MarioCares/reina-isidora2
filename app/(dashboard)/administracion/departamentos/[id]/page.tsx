import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";
import ApartmentDetail from "@/components/departamentos/ApartmentDetail";

export default async function ApartmentPage({
  params,
}: {
  params: { id: number };
}) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }

  return <ApartmentDetail id={Number(params.id)} />;
}
