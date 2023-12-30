import { Worker } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";
import AddWorkerButton from "@/components/personal/AddWorkerButton";
import { IMapString } from "@/interfaces/IMap";
import { dateTimeToDateEs } from "@/utils/Strings";
import Link from "next/link";
import Icono from "@/components/ui/Icono";
import { faIdCard } from "@fortawesome/free-solid-svg-icons";

export const revalidate: number = 0;

const getBankAccountTypes = async (): Promise<IMapString[]> => {
  const data = await fetch(
    `http://localhost:3000/api/params/bank-account-types`
  );
  return await data.json();
};

const getWorkers = async (): Promise<Worker[]> => {
  const data = await fetch("http://localhost:3000/api/worker", {
    next: {
      revalidate: 0,
    },
  });
  return (await data.json()) as Worker[];
};

export default async function WorkersPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  const bankAccountTypes = await getBankAccountTypes();
  const workers = await getWorkers();

  return (
    <div className="p-3">
      <nav className="level">
        <div className="level-left">
          <div className="level-item">
            <h1 className="title is-2">Personal</h1>
          </div>
        </div>
        <div className="level-right">
          <div className="level-item">
            <AddWorkerButton bankAccountTypes={bankAccountTypes} />
          </div>
        </div>
      </nav>
      <div className="columns is-variable is-desktop">
        <div className="column">
          <div className="table-container">
            <table className="table is-bordered is-narrow is-fullwidth">
              <thead>
                <tr>
                  <th>RUN-DNI</th>
                  <th>Nombre</th>
                  <th>Cargo</th>
                  <th>Inicio Contrato</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {workers.map((worker: Worker) => (
                  <tr key={worker.id}>
                    <td>{worker.rutDNI}</td>
                    <td>{worker.name}</td>
                    <td>{worker.jobTitle}</td>
                    <td>{dateTimeToDateEs(worker.startAt)}</td>
                    <td>
                      <Link
                        href={`/administracion/personal/${worker.id}`}
                        className="button is-primary"
                      >
                        <Icono icon={faIdCard} text={"Ficha"} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="columns is-variable is-desktop">
        <div className="column"></div>
      </div>
    </div>
  );
}
