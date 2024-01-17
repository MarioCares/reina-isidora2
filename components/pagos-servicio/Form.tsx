import { SelectFromMap } from "@/utils/Select";
import React, { FormEvent } from "react";
import { ServicePayment } from "@prisma/client";
import { dateTimeToDateEn } from "@/utils/Strings";
import { IMapString } from "@/interfaces/IMap";

interface ServicePaymentFormProps {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  initialServicePayment: string;
  servicePaymentTypes: IMapString[];
  formData?: ServicePayment;
}

export default function ServicePaymentForm({
  onSubmit,
  initialServicePayment,
  servicePaymentTypes,
  formData,
}: ServicePaymentFormProps) {
  return (
    <form onSubmit={onSubmit} id="form-add-service-payment">
      <div className="field">
        <label htmlFor="servicePaymentType" className="label">
          Tipo Servicio
        </label>
        <div className="control is-expanded">
          <div className="select is-fullwidth is-medium">
            <SelectFromMap
              name="servicePaymentType"
              map={servicePaymentTypes}
              selected={initialServicePayment}
            />
          </div>
        </div>
      </div>
      <div className="field">
        <label htmlFor="documentId" className="label">
          Nº Documento
        </label>
        <div className="control is-expanded">
          <input
            type="text"
            className="input is-medium"
            name="documentId"
            id="documentId"
            required
            defaultValue={formData ? formData.documentId : ""}
          />
        </div>
      </div>
      <div className="field">
        <label htmlFor="expireAt" className="label">
          Fecha de emisión
        </label>
        <div className="control is-expanded">
          <input
            type="date"
            className="input is-medium"
            name="expireAt"
            id="expireAt"
            required
            defaultValue={formData ? dateTimeToDateEn(formData.expireAt) : ""}
          />
        </div>
      </div>
      <div className="field">
        <label htmlFor="amount" className="label">
          Monto
        </label>
        <div className="control is-expanded">
          <input
            type="number"
            min={1}
            className="input is-medium"
            name="amount"
            id="amount"
            required
            defaultValue={formData ? formData.amount : ""}
          />
        </div>
      </div>
      <div className="field">
        <label htmlFor="observation" className="label">
          Observación
        </label>
        <div className="control is-expanded">
          <textarea
            name="observation"
            id="observation"
            rows={2}
            className="textarea"
            defaultValue={formData ? formData.observation : ""}
          ></textarea>
        </div>
      </div>
      {formData && (
        <>
          <div className="field">
            <label htmlFor="paymentAt" className="label">
              Fecha de Pago
            </label>
            <div className="control is-expanded">
              <input
                type="date"
                className="input is-medium"
                name="paymentAt"
                id="paymentAt"
                required
                defaultValue={
                  formData ? dateTimeToDateEn(formData.paymentAt) : ""
                }
              />
            </div>
          </div>
          <div className="field">
            <label htmlFor="file" className="label">
              Archivo Respaldo
            </label>
            <div className="control is-expanded">
              <input
                className="input is-medium"
                name="file"
                id="file"
                required
                defaultValue={formData ? `${formData.file}` : ""}
              />
            </div>
          </div>
        </>
      )}
    </form>
  );
}
