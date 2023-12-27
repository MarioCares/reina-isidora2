"use client";

import ServicePaymentForm from "@/components/pagos-servicio/Form";
import React, { FormEvent } from "react";
import { ServicePayment } from "@prisma/client";
import useUpdatePayment from "@/hooks/pagos-servicio/useUpdatePayment";
import { IAddServicePayment } from "@/interfaces/pagos-servicio/IAddPayment";
import OkNotification from "@/components/ui/OkNotification";

export default function ReviewServicePayment({
  servicePayment,
  servicePaymentTypes,
}: {
  servicePayment: ServicePayment;
  servicePaymentTypes: { value: string; label: string }[];
}) {
  const { handleUpdatePayment, loadingUpdatePayment, statusUpdatePayment } =
    useUpdatePayment();

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const time = new Date().toISOString().split("T")[1];
    handleUpdatePayment({
      id: servicePayment.id,
      servicePaymentType: data.get("servicePaymentType"),
      documentId: data.get("documentId"),
      expireAt: `${data.get("expireAt")}T${time}`,
      amount: Number(data.get("amount")),
      observation: data.get("observation"),
      paymentAt: `${data.get("paymentAt")}T${time}`,
      file: data.get("file"),
    } as IAddServicePayment);
  };
  return (
    <div className="box">
      {statusUpdatePayment === "ok" && (
        <OkNotification
          title="Documento Actualizado!"
          link={`/administracion/pagos-servicio/tipo/${servicePayment.servicePaymentType}`}
          buttonText="Volver a listado de Pagos"
        />
      )}
      <ServicePaymentForm
        onSubmit={onSubmit}
        initialServicePayment={servicePayment.servicePaymentType}
        servicePaymentTypes={servicePaymentTypes}
        formData={servicePayment}
      />
      {loadingUpdatePayment ? (
        <button className="mt-4 button is-warning is-loading is-disabled" />
      ) : (
        <button
          type="submit"
          form="form-add-service-payment"
          className="mt-4 button is-warning"
        >
          Actualizar
        </button>
      )}
    </div>
  );
}
