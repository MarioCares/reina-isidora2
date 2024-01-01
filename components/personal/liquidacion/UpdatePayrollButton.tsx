"use client";

import { FormEvent, useState } from "react";
import useCRUDPayroll from "@/hooks/personal/useCRUDPayroll";
import { HeaderPayrollForm } from "@/components/personal/liquidacion/Form";
import { IMapString } from "@/interfaces/IMap";
import { Payroll } from "@prisma/client";
import Icono from "@/components/ui/Icono";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import Modal from "@/components/ui/Modal";
import { SendFormModal } from "@/components/ui/Buttons";
import OkNotification from "@/components/ui/OkNotification";

interface UpdatePayrollButtonProps {
  workers: IMapString[];
  formData: Payroll;
}

export default function UpdatePayrollButton({
  workers,
  formData,
}: UpdatePayrollButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { loadingPayroll, statusPayroll, handleUpdateHeader } =
    useCRUDPayroll();

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const time = new Date().toISOString().split("T")[1];
    handleUpdateHeader({
      id: formData.id,
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
        <Icono icon={faEdit} text="Editar" />{" "}
      </button>
      <Modal
        closeModal={() => setIsModalOpen(false)}
        isOpen={isModalOpen}
        title={"Editar Pre-Liquidación"}
        successButton={
          <SendFormModal className={"is-success"} form={"form-payroll"}>
            Guardar Cabecera
          </SendFormModal>
        }
        isLoading={loadingPayroll}
      >
        {statusPayroll === "ok" && (
          <OkNotification
            title={"Cabecera actualizada!"}
            reload={() => window.location.reload()}
            link={""}
            buttonText={"Actualizar página"}
          />
        )}
        {statusPayroll && statusPayroll !== "ok" && (
          <div className="notification is-danger">{statusPayroll}</div>
        )}
        <HeaderPayrollForm
          onSubmit={onSubmit}
          workers={workers}
          initialWorker={""}
          formData={formData}
        />
      </Modal>
    </>
  );
}
