"use client";

import { faPlus } from "@fortawesome/free-solid-svg-icons";
import React, { FormEvent, useState } from "react";
import Modal from "@/components/ui/Modal";
import Icono from "@/components/ui/Icono";
import useAddPayment from "@/hooks/pagos-servicio/useAddPayment";
import { IAddServicePayment } from "@/interfaces/pagos-servicio/IAddPayment";
import Link from "next/link";
import ServicePaymentForm from "@/components/pagos-servicio/Form";

interface AddPaymentButtonProps {
  initialServicePayment: string;
  servicePaymentTypes: Record<string, string>;
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

  const SuccessButton = () => (
    <button
      className="button is-success"
      form="form-add-service-payment"
      type="submit"
    >
      Guardar
    </button>
  );

  const OkNotificacion = () => (
    <div className="notification is-primary">
      <h1 className="title is-4">Documento Agregado!</h1>
      <Link href="/administracion/pagos-servicio" className="button is-default">
        Volver a listado de Pagos
      </Link>
    </div>
  );

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
        successButton={<SuccessButton />}
        isLoading={loadingAddPayment}
      >
        {statusAddPayment === "ok" && <OkNotificacion />}
        {statusAddPayment === "!ok" && (
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
