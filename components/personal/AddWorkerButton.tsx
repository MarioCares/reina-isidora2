"use client";

import React, { FormEvent, useState } from "react";
import Icono from "@/components/ui/Icono";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Modal from "@/components/ui/Modal";
import WorkerForm from "@/components/personal/Form";
import { IMapString } from "@/interfaces/IMap";
import useCRUDWorker from "@/hooks/personal/useCRUDWorker";
import OkNotification from "@/components/ui/OkNotification";
import { IWorker } from "@/interfaces/personal/IAddWorker";
import { SendFormModal } from "@/components/ui/Buttons";

interface AddWorkerButtonProps {
  bankAccountTypes: IMapString[];
}
export default function AddWorkerButton({
  bankAccountTypes,
}: AddWorkerButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { handleAddWorker, loadingWorker, statusWorker } = useCRUDWorker();

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const time = new Date().toISOString().split("T")[1];
    handleAddWorker({
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
    <>
      <button
        className="button is-primary"
        onClick={() => setIsModalOpen(true)}
      >
        <Icono icon={faPlus} text="Agregar" />{" "}
      </button>
      <Modal
        closeModal={() => setIsModalOpen(false)}
        isOpen={isModalOpen}
        title={"Nuevo Trabajador"}
        successButton={
          <SendFormModal form="form-worker" className="is-success">
            Guardar
          </SendFormModal>
        }
        isLoading={loadingWorker}
      >
        {statusWorker === "ok" && (
          <OkNotification
            title="Documento Agregado!"
            link={""}
            reload={() => window.location.reload()}
            buttonText="Volver a listado Personal"
          />
        )}
        {statusWorker && statusWorker !== "ok" && (
          <div className="notification is-danger">{statusWorker}</div>
        )}
        <WorkerForm onSubmit={onSubmit} bankAccountTypes={bankAccountTypes} />
      </Modal>
    </>
  );
}
