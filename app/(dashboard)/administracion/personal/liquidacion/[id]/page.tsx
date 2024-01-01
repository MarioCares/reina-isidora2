import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";
import { Payroll, Worker } from "@prisma/client";
import AddPayrollButton from "@/components/personal/AddPayrollButton";
import { IMapString } from "@/interfaces/IMap";
import ItemNotFound from "@/components/ui/ItemNotFound";
import { dateTimeToDateEs } from "@/utils/Strings";
import Link from "next/link";
import Icono from "@/components/ui/Icono";
import { faDiagramNext } from "@fortawesome/free-solid-svg-icons";

export const revalidate: number = 0;

const getWorker = async (workerId: number): Promise<Worker> => {
  const data = await fetch(`http://localhost:3000/api/worker/${workerId}`, {
    next: {
      revalidate: 0,
    },
  });
  return (await data.json()) as Worker;
};

const getWorkersMap = async (): Promise<IMapString[]> => {
  const data = await fetch(`http://localhost:3000/api/worker`, {
    next: {
      revalidate: 0,
    },
  });
  const workers = (await data.json()) as Worker[];
  return workers.map((worker: Worker) => ({
    value: worker.id.toString(),
    label: worker.name,
  }));
};

const getPayrolls = async (workerId: number): Promise<Payroll[]> => {
  const data = await fetch(
    `http://localhost:3000/api/payroll/worker/${workerId}`,
    {
      next: {
        revalidate: 0,
      },
    }
  );
  return await data.json();
};

export default async function WorkerPayrollPage({
  params,
}: {
  params: { id: number };
}) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }

  const worker = await getWorker(params.id);
  const payrolls = await getPayrolls(params.id);
  const workersMap = await getWorkersMap();

  return (
    <div className="p-3">
      <nav className="level">
        <div className="level-left">
          <div className="level-item">
            <h1 className="title is-2">Liquidaciones - </h1>
            <h1 className="title is-2"> {worker.name}</h1>
          </div>
        </div>
        <div className="level-right">
          <div className="level-item">
            {worker.id && (
              <AddPayrollButton
                workerId={worker.id.toString()}
                workers={workersMap}
              />
            )}
          </div>
        </div>
      </nav>
      <div className="columns is-variable is-desktop">
        <div className="column">
          {worker.id ? (
            <div className="table-container">
              <table className="table is-bordered is-narrow is-fullwidth">
                <thead>
                  <tr>
                    <th>Mes-Año</th>
                    <th>Estado</th>
                    <th>Monto</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {payrolls.map((payroll: Payroll) => (
                    <tr key={payroll.id}>
                      <td>{dateTimeToDateEs(payroll.payrollAt)}</td>
                      <td>{payroll.isCalculated ? "Cerrada" : "Abierta"}</td>
                      <td className="inline-text has-text-right">
                        $ {payroll.isCalculated ? "Cerrada" : 0}
                      </td>
                      <td>
                        <div className="buttons">
                          <Link
                            href={`/administracion/liquidaciones/${payroll.id}`}
                            className="button is-primary"
                          >
                            <Icono icon={faDiagramNext} text={"Completar"} />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <ItemNotFound
              subtitle={"Trabajador no existe"}
              link={"/administracion/personal"}
            />
          )}
        </div>
      </div>
      <div className="columns is-variable is-desktop">
        <div className="column"></div>
      </div>
    </div>
  );
}
