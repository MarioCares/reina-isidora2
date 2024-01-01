import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Worker } from "@prisma/client";
import React from "react";
import { IMapString } from "@/interfaces/IMap";
import ReviewWorker from "@/components/personal/ReviewWorker";
import ItemNotFound from "@/components/ui/ItemNotFound";

export const revalidate: number = 0;

const getWorker = async (id: number): Promise<Worker> => {
  const data = await fetch(`http://localhost:3000/api/worker/${id}`, {
    next: {
      revalidate: 0,
    },
  });
  return (await data.json()) as Worker;
};

const getBankAccountTypes = async (): Promise<IMapString[]> => {
  const data = await fetch(
    `http://localhost:3000/api/params/bank-account-types`
  );
  return await data.json();
};

export default async function WorkerPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  const worker = await getWorker(Number(params.id));
  const bankAccountTypes = await getBankAccountTypes();

  return (
    <div className="p-3">
      <nav className="level">
        <div className="level-left">
          <div className="level-item">
            <h1 className="title is-2">Ficha - </h1>
            <h1 className="title is-2"> {worker.name}</h1>
          </div>
        </div>
        <div className="level-right"></div>
      </nav>
      <div className="columns is-variable is-desktop">
        <div className="column">
          {worker.id ? (
            <ReviewWorker worker={worker} bankAccountTypes={bankAccountTypes} />
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
