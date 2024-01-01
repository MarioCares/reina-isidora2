"use client";

import { FormEvent, useState } from "react";
import Icono from "@/components/ui/Icono";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Modal from "@/components/ui/Modal";
import { SendFormModal } from "@/components/ui/Buttons";
import { IMapString } from "@/interfaces/IMap";
import { HeaderPayrollForm } from "@/components/personal/liquidacion/Form";
import useCRUDPayroll from "@/hooks/personal/useCRUDPayroll";
import OkNotification from "@/components/ui/OkNotification";

interface AddPayrollButtonProps {
  workers: IMapString[];
  workerId: string;
}
export default function AddPayrollButton({
  workers,
  workerId,
}: AddPayrollButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { loadingPayroll, statusPayroll, handleAddHeader } = useCRUDPayroll();

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const time = new Date().toISOString().split("T")[1];
    handleAddHeader({
      payrollAt: `${data.get("payrollAt")}-01T${time}`,
      workerId: Number(data.get("workerId")),
      absenceDays: Number(data.get("absenceDays")),
      hours50: Number(data.get("hours50")),
      hours100: Number(data.get("hours100")),
      workedDays: Number(data.get("workedDays")),
      payAdvance: Number(data.get("payAdvance")),
    });
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
        title={"Nueva Pre-Liquidación"}
        successButton={
          <SendFormModal className={"is-success"} form={"form-payroll"}>
            Guardar Cabecera
          </SendFormModal>
        }
        isLoading={loadingPayroll}
      >
        {statusPayroll === "ok" && (
          <OkNotification
            title={"Cabecera creada!"}
            link={""}
            reload={() => window.location.reload()}
            buttonText={"Continuar con detalle"}
          />
        )}
        {statusPayroll && statusPayroll !== "ok" && (
          <div className="notification is-danger">{statusPayroll}</div>
        )}
        <HeaderPayrollForm
          onSubmit={onSubmit}
          workers={workers}
          initialWorker={workerId}
        />
      </Modal>
    </>
  );
}
