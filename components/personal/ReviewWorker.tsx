"use client";

import { Worker } from "@prisma/client";
import { IMapString } from "@/interfaces/IMap";
import WorkerForm from "@/components/personal/Form";
import useCRUDWorker from "@/hooks/personal/useCRUDWorker";
import React, { FormEvent } from "react";
import { IWorker } from "@/interfaces/personal/IAddWorker";
import OkNotification from "@/components/ui/OkNotification";

export default function ReviewWorker({
  worker,
  bankAccountTypes,
}: {
  worker: Worker;
  bankAccountTypes: IMapString[];
}) {
  const { statusWorker, loadingWorker, handleUpdateWorker } = useCRUDWorker();

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const time = new Date().toISOString().split("T")[1];
    handleUpdateWorker({
      id: worker.id,
      name: data.get("name"),
      afpName: data.get("afpName"),
      bank: data.get("bank"),
      healthName: data.get("healthName"),
      salaryAmount: Number(data.get("salaryAmount")),
      bankAccount: data.get("bankAccount"),
      rutDNI: (data.get("rutDNI") as string).replaceAll(".", ""),
      jobTitle: data.get("jobTitle"),
      afpPercent: Number(data.get("afpPercent")),
      bankAccountType: data.get("bankAccountType"),
      healthPercent: Number(data.get("healthPercent")),
      startAt: `${data.get("startAt")}T${time}`,
      transportationBonus: Number(data.get("transportationBonus")),
      mealBonus: Number(data.get("mealBonus")),
      accountabilityBonus: Number(data.get("accountabilityBonus")),
      otherBonus: Number(data.get("otherBonus")),
      baseDays: Number(data.get("baseDays")),
    } as IWorker);
  };

  return (
    <div className="box">
      {statusWorker === "ok" && (
        <OkNotification
          title="Trabajador Actualizado!"
          link={"/administracion/personal"}
          buttonText="Volver a listado Personal"
        />
      )}
      {statusWorker && statusWorker !== "ok" && (
        <div className="notification is-danger">{statusWorker}</div>
      )}
      <WorkerForm
        onSubmit={onSubmit}
        bankAccountTypes={bankAccountTypes}
        formData={worker}
      />
      {loadingWorker ? (
        <button className="mt-4 button is-warning is-loading is-disabled" />
      ) : (
        <button
          type="submit"
          form="form-worker"
          className="mt-4 button is-warning"
        >
          Actualizar
        </button>
      )}
    </div>
  );
}
