import { ServicePayment } from "@prisma/client";
import { dateTimeToDateEs } from "@/utils/Strings";
import Link from "next/link";
import Icono from "@/components/ui/Icono";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export const revalidate: number = 0;

const getServicePayments = async (): Promise<ServicePayment[]> => {
  const data = await fetch("http://localhost:3000/api/service-payment", {
    next: {
      revalidate: 0,
    },
  });
  return (await data.json()) as ServicePayment[];
};

export default async function ServicePaymentsPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  const servicePayments = await getServicePayments();
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
                {servicePayments.map((item) => (
                  <tr key={item.id}>
                    <td>{item.servicePaymentType}</td>
                    <td>{item.documentId}</td>
                    <td>{dateTimeToDateEs(item.expireAt)}</td>
                    <td>{dateTimeToDateEs(item.paymentAt)}</td>
                    <td>{item.observation}</td>
                    <td className="inline-text has-text-right">
                      $ {item.amount.toLocaleString("de-DE")}
                    </td>
                    <td>
                      <Link
                        href={`/administracion/pagos-servicio/${item.id}`}
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
