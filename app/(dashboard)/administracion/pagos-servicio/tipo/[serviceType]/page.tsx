import React from "react";
import AddPaymentButton from "@/components/pagos-servicio/AddPaymentButton";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { dateTimeToDateEs, serviceTypes } from "@/utils/Strings";
import Icono from "@/components/ui/Icono";
import { faEdit, faFile } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import DeletePaymentButton from "@/components/pagos-servicio/DeletePaymentButton";
import { IServicePaymentWithTotalAmount } from "@/interfaces/pagos-servicio/Agreggations";
import { ServicePaymentToOneBarChart } from "@/utils/DataToCharts";
import { ServicePaymentChart } from "@/components/pagos-servicio/ServicePaymentChart";
import { checkInEnum } from "@/utils/Validations";
import { IMapString } from "@/interfaces/IMap";

export const revalidate: number = 0;

const getServicePaymentTypes = async (): Promise<IMapString[]> => {
  const data = await fetch(
    `http://localhost:3000/api/params/service-payment-types`
  );
  return await data.json();
};

const getServicePaymentDocuments = async (
  type: string
): Promise<IServicePaymentWithTotalAmount> => {
  if (!checkInEnum(type)) {
    return {
      servicePayments: [],
      totalAmount: 0,
    };
  }
  const data = await fetch(
    `http://localhost:3000/api/service-payment/documents/${type}`,
    {
      next: {
        revalidate: 0,
      },
    }
  );
  return (await data.json()) as IServicePaymentWithTotalAmount;
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
  const servicePaymentDocumentsWithTotalAmount =
    await getServicePaymentDocuments(params.serviceType.toUpperCase());

  const chart = ServicePaymentToOneBarChart(
    servicePaymentDocumentsWithTotalAmount.servicePayments
      .reverse()
      .map((servicePaymentDocument) => ({
        month: dateTimeToDateEs(servicePaymentDocument.expireAt),
        amount: servicePaymentDocument.amount,
      }))
  );

  const option = {
    xAxis: {
      type: "category",
      data: chart.xData,
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: chart.seriesData,
        type: "bar",
      },
    ],
  };

  return (
    <div className="p-3">
      <nav className="level">
        <div className="level-left">
          <div className="level-item">
            <h1 className="title is-2">Pagos de Servicio - </h1>
          </div>
          <div className="level-item">
            <h1 className="title is-2">{serviceTypes[params.serviceType]}</h1>
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
                {servicePaymentDocumentsWithTotalAmount.servicePayments.map(
                  (document) => (
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
                        <div className="buttons">
                          <Link
                            href={`/administracion/pagos-servicio/${document.id}`}
                            className="button is-warning"
                          >
                            <Icono icon={faEdit} />
                          </Link>
                          {document.file && (
                            <a
                              href={document.file}
                              target="_blank"
                              className="button is-link"
                            >
                              <Icono icon={faFile} />
                            </a>
                          )}
                          <DeletePaymentButton paymentId={document.id} />
                        </div>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
              <tfoot>
                <tr>
                  <th colSpan={5} className="inline-text has-text-right">
                    ${" "}
                    {servicePaymentDocumentsWithTotalAmount.totalAmount.toLocaleString(
                      "de-DE"
                    )}
                  </th>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
      <div className="columns is-variable is-desktop">
        <div className="column">
          <ServicePaymentChart option={option} />
        </div>
      </div>
    </div>
  );
}
