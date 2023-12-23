import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";
import { ServicePayment } from "@prisma/client";
import ItemNotFound from "@/components/ui/ItemNotFound";
import ReviewServicePayment from "@/components/pagos-servicio/ReviewServicePayment";

export const revalidate: number = 0;

const getServicePayment = async (id: number): Promise<ServicePayment> => {
  const data = await fetch(`http://localhost:3000/api/service-payment/${id}`, {
    next: {
      revalidate: 0,
    },
  });
  return (await data.json()) as ServicePayment;
};

const getServicePaymentTypes = async (): Promise<Record<string, string>> => {
  const data = await fetch(
    `http://localhost:3000/api/params/service-payment-types`
  );
  return await data.json();
};

export default async function ServicePaymentItemPage({
  params,
}: {
  params: { id: number };
}) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }

  const servicePayment = await getServicePayment(params.id);
  const servicePaymentTypes = await getServicePaymentTypes();

  return (
    <div className="p-3">
      <nav className="level">
        <div className="level-left">
          <div className="level-item">
            <h1 className="title is-2">Pago de Servicio - </h1>
          </div>
          <div className="level-item">
            <h1 className="title is-2">Documento interno Nº {params.id}</h1>
          </div>
        </div>
        <div className="level-right">
          <div className="level-item"></div>
        </div>
      </nav>
      <div className="columns is-variable is-desktop">
        <div className="column">
          {!servicePayment.id ? (
            <ItemNotFound
              subtitle="El documento no existe"
              link="/administracion/pagos-servicio"
            />
          ) : (
            <ReviewServicePayment
              servicePaymentTypes={servicePaymentTypes}
              servicePayment={servicePayment}
            />
          )}
        </div>
      </div>
    </div>
  );
}
