import React from "react";
import AddPaymentButton from "@/components/pagos-servicio/AddPaymentButton";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { ServicePayment } from "@prisma/client";
import { dateTimeToDateEs } from "@/utils/Strings";
import Icono from "@/components/ui/Icono";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export const revalidate: number = 0;

const getServicePaymentTypes = async (): Promise<Record<string, string>> => {
  const data = await fetch(
    `http://localhost:3000/api/params/service-payment-types`
  );
  return await data.json();
};

const getServicePaymentDocuments = async (
  type: string
): Promise<ServicePayment[]> => {
  const data = await fetch(
    `http://localhost:3000/api/service-payment/documents/${type}`,
    {
      next: {
        revalidate: 0,
      },
    }
  );
  return (await data.json()) as ServicePayment[];
};

export default async function ServicePaymentPage({
  params,
}: {
  params: { serviceType: string };
}) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }

  const servicePaymentTypes = await getServicePaymentTypes();
  const servicePaymentDocuments = await getServicePaymentDocuments(
    params.serviceType.toUpperCase()
  );

  console.log("servicePaymentDocuments", servicePaymentDocuments);

  return (
    <div className="p-3">
      <nav className="level">
        <div className="level-left">
          <div className="level-item">
            <h1 className="title is-2">Pagos de Servicio - </h1>
          </div>
          <div className="level-item">
            <h1 className="title is-2">{params.serviceType.toUpperCase()}</h1>
          </div>
        </div>
        <div className="level-right">
          <div className="level-item">
            <AddPaymentButton
              initialServicePayment={params.serviceType.toUpperCase()}
              servicePaymentTypes={servicePaymentTypes}
            />
          </div>
        </div>
      </nav>
      <div className="columns is-variable is-desktop">
        <div className="column">
          <div className="table-container">
            <table className="table is-bordered is-narrow is-fullwidth">
              <thead>
                <tr>
                  <th>Nº Documento</th>
                  <th>Fecha Vencimiento</th>
                  <th>Fecha Pago</th>
                  <th>Observación</th>
                  <th>Monto</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {servicePaymentDocuments.map((document) => (
                  <tr key={document.id}>
                    <td>{document.documentId}</td>
                    <td className="inline-text">
                      {dateTimeToDateEs(document.expireAt)}
                    </td>
                    <td className="inline-text">
                      {dateTimeToDateEs(document.paymentAt)}
                    </td>
                    <td>{document.observation}</td>
                    <td className="inline-text has-text-right">
                      $ {document.amount.toLocaleString("de-DE")}
                    </td>
                    <td>
                      <Link
                        href={`/administracion/pagos-servicio/${document.id}`}
                        className="button is-warning"
                      >
                        <Icono icon={faEdit} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
