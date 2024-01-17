"use client";

import { faPlus } from "@fortawesome/free-solid-svg-icons";
import React, { FormEvent, useState } from "react";
import Modal from "@/components/ui/Modal";
import Icono from "@/components/ui/Icono";
import useAddPayment from "@/hooks/pagos-servicio/useAddPayment";
import { IAddServicePayment } from "@/interfaces/pagos-servicio/IAddPayment";
import ServicePaymentForm from "@/components/pagos-servicio/Form";
import OkNotification from "@/components/ui/OkNotification";
import { IMapString } from "@/interfaces/IMap";
import { SendFormModal } from "@/components/ui/Buttons";

interface AddPaymentButtonProps {
  initialServicePayment: string;
  servicePaymentTypes: IMapString[];
}

export default function AddPaymentButton({
  initialServicePayment,
  servicePaymentTypes,
}: AddPaymentButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { handleAddPayment, loadingAddPayment, statusAddPayment } =
    useAddPayment();

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const time = new Date().toISOString().split("T")[1];
    handleAddPayment({
      servicePaymentType: data.get("servicePaymentType"),
      documentId: data.get("documentId"),
      expireAt: `${data.get("expireAt")}T${time}`,
      amount: Number(data.get("amount")),
      observation: data.get("observation"),
      paymentAt: undefined,
      file: undefined,
    } as IAddServicePayment);
  };

  return (
    <>
      <button
        className="button is-primary"
        onClick={() => setIsModalOpen(true)}
      >
        <Icono icon={faPlus} text="Agregar" />
      </button>
      <Modal
        closeModal={() => setIsModalOpen(!isModalOpen)}
        isOpen={isModalOpen}
        title="Nuevo Documento"
        successButton={
          <SendFormModal form="form-add-service-payment" className="is-success">
            Guardar
          </SendFormModal>
        }
        isLoading={loadingAddPayment}
      >
        {statusAddPayment === "ok" && (
          <OkNotification
            title="Documento Agregado!"
            link={"/administracion/pagos-servicio"}
            buttonText="Volver a listado de Pagos"
          />
        )}
        {statusAddPayment && statusAddPayment !== "ok" && (
          <div className="notification is-danger">{statusAddPayment}</div>
        )}
        <ServicePaymentForm
          servicePaymentTypes={servicePaymentTypes}
          initialServicePayment={initialServicePayment}
          onSubmit={onSubmit}
        />
      </Modal>
    </>
  );
}
