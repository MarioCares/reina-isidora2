import { dateTimeToDateEs, months } from "@/utils/Strings";
import Link from "next/link";
import Icono from "@/components/ui/Icono";
import { faEdit, faFile } from "@fortawesome/free-solid-svg-icons";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import DeletePaymentButton from "@/components/pagos-servicio/DeletePaymentButton";
import { IServicePaymentWithTotalAmount } from "@/interfaces/pagos-servicio/Agreggations";
import React from "react";
import { ServicePaymentChart } from "@/components/pagos-servicio/ServicePaymentChart";
import { ServicePaymentToMultipleBarChart } from "@/utils/DataToCharts";

export const revalidate: number = 0;

const getServicePayments =
  async (): Promise<IServicePaymentWithTotalAmount> => {
    const data = await fetch("http://localhost:3000/api/service-payment", {
      next: {
        revalidate: 0,
      },
    });
    return (await data.json()) as IServicePaymentWithTotalAmount;
  };

export default async function ServicePaymentsPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  const servicePaymentDocumentsWithTotalAmount = await getServicePayments();

  const option = ServicePaymentToMultipleBarChart(
    servicePaymentDocumentsWithTotalAmount.servicePayments
      .reverse()
      .map((document) => ({
        amount: document.amount,
        serviceType: document.servicePaymentType,
        month:
          months[Number(dateTimeToDateEs(document.expireAt).split("-")[1])],
      }))
  );

  return (
    <div className="p-3">
      <nav className="level">
        <div className="level-left">
          <div className="level-item">
            <h1 className="title is-2">Pagos de Servicio</h1>
          </div>
        </div>
        <div className="level-right"></div>
      </nav>
      <div className="columns is-variable is-desktop">
        <div className="column">
          <div className="table-container">
            <table className="table is-bordered is-narrow is-fullwidth">
              <thead>
                <tr>
                  <th>Tipo</th>
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
                  (item) => (
                    <tr key={item.id}>
                      <td>{item.servicePaymentType}</td>
                      <td>{item.documentId}</td>
                      <td className="inline-text">
                        {dateTimeToDateEs(item.expireAt)}
                      </td>
                      <td className="inline-text">
                        {dateTimeToDateEs(item.paymentAt)}
                      </td>
                      <td>{item.observation}</td>
                      <td className="inline-text has-text-right">
                        $ {item.amount.toLocaleString("de-DE")}
                      </td>
                      <td>
                        <div className="buttons">
                          <Link
                            href={`/administracion/pagos-servicio/${item.id}`}
                            className="button is-warning"
                          >
                            <Icono icon={faEdit} />
                          </Link>
                          {item.file && (
                            <a href={item.file} className="button is-link">
                              <Icono icon={faFile} />
                            </a>
                          )}
                          <DeletePaymentButton paymentId={item.id} />
                        </div>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
              <tfoot>
                <tr>
                  <th colSpan={6} className="inline-text has-text-right">
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
