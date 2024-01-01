import React, { FormEvent } from "react";
import { Worker } from "@prisma/client";
import { dateTimeToDateEn } from "@/utils/Strings";
import { SelectFromMap } from "@/utils/Select";
import { IMapString } from "@/interfaces/IMap";

interface WorkerFormProps {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  bankAccountTypes: IMapString[];
  formData?: Worker;
}
export default function WorkerForm({
  onSubmit,
  formData,
  bankAccountTypes,
}: WorkerFormProps) {
  return (
    <form onSubmit={onSubmit} id="form-worker">
      <div className="columns">
        <div className="column">
          <div className="field">
            <label htmlFor="rutDNI" className="label">
              RUN/DNI
            </label>
            <div className="control is-expanded">
              <input
                type="text"
                className="input is-medium"
                name="rutDNI"
                id="rutDNI"
                required
                defaultValue={formData ? formData.rutDNI : ""}
                placeholder="Ej: 11111111"
              />
              <div className="help is-size-5">
                Si es rut, formato: 11111111-1
              </div>
            </div>
          </div>
        </div>
        <div className="column">
          <div className="field">
            <label htmlFor="jobTitle" className="label">
              Cargo
            </label>
            <div className="control is-expanded">
              <input
                type="text"
                className="input is-medium"
                name="jobTitle"
                id="jobTitle"
                required
                defaultValue={formData ? formData.jobTitle : ""}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <div className="field">
            <label htmlFor="name" className="label">
              Nombre Completo
            </label>
            <div className="control is-expanded">
              <input
                type="text"
                className="input is-medium"
                name="name"
                id="name"
                required
                defaultValue={formData ? formData.name : ""}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <div className="field">
            <label htmlFor="startAt" className="label">
              Inicio Contrato
            </label>
            <div className="control is-expanded">
              <input
                type="date"
                className="input is-medium"
                name="startAt"
                id="startAt"
                required
                defaultValue={
                  formData ? dateTimeToDateEn(formData.startAt) : ""
                }
              />
            </div>
          </div>
        </div>
        <div className="column">
          <div className="field">
            <label htmlFor="salaryAmount" className="label">
              Sueldo Base
            </label>
            <div className="control is-expanded">
              <input
                type="number"
                className="input is-medium"
                name="salaryAmount"
                id="salaryAmount"
                required
                defaultValue={formData ? formData.salaryAmount : ""}
              />
            </div>
          </div>
        </div>
        <div className="column">
          <div className="field">
            <label htmlFor="baseDays" className="label">
              Días base
            </label>
            <div className="control is-expanded">
              <input
                type="number"
                className="input is-medium"
                name="baseDays"
                id="baseDays"
                required
                defaultValue={formData ? Number(formData.baseDays) : 0}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <div className="field">
            <label htmlFor="transportationBonus" className="label">
              Bono {formData ? "movilización" : "mov."}
            </label>
            <div className="control is-expanded">
              <input
                type="number"
                className="input is-medium"
                name="transportationBonus"
                id="transportationBonus"
                required
                defaultValue={
                  formData ? Number(formData.transportationBonus) : 0
                }
              />
            </div>
          </div>
        </div>
        <div className="column">
          <div className="field">
            <label htmlFor="mealBonus" className="label">
              Bono colación
            </label>
            <div className="control is-expanded">
              <input
                type="number"
                className="input is-medium"
                name="mealBonus"
                id="mealBonus"
                required
                defaultValue={formData ? Number(formData.mealBonus) : 0}
              />
            </div>
          </div>
        </div>
        <div className="column">
          <div className="field">
            <label htmlFor="accountabilityBonus" className="label">
              Bono respons.
            </label>
            <div className="control is-expanded">
              <input
                type="number"
                className="input is-medium"
                name="accountabilityBonus"
                id="accountabilityBonus"
                required
                defaultValue={
                  formData ? Number(formData.accountabilityBonus) : 0
                }
              />
            </div>
          </div>
        </div>
        <div className="column">
          <div className="field">
            <label htmlFor="otherBonus" className="label">
              Otros bonos
            </label>
            <div className="control is-expanded">
              <input
                type="number"
                className="input is-medium"
                name="otherBonus"
                id="otherBonus"
                required
                defaultValue={formData ? Number(formData.otherBonus) : 0}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <div className="field">
            <label htmlFor="bank" className="label">
              Banco
            </label>
            <div className="control is-expanded">
              <input
                type="text"
                className="input is-medium"
                name="bank"
                id="bank"
                required
                defaultValue={formData ? formData.bank : ""}
              />
            </div>
          </div>
        </div>
        <div className="column">
          <div className="field">
            <label htmlFor="bankAccount" className="label">
              Nº Cuenta Banco
            </label>
            <div className="control is-expanded">
              <input
                type="text"
                className="input is-medium"
                name="bankAccount"
                id="bankAccount"
                required
                defaultValue={formData ? formData.bankAccount : ""}
              />
            </div>
          </div>
        </div>
        <div className="column">
          <div className="field">
            <label htmlFor="bankAccountType" className="label">
              Tipo Cuenta
            </label>
            <div className="control is-expanded">
              <div className="select is-fullwidth is-medium">
                <SelectFromMap
                  name="bankAccountType"
                  map={bankAccountTypes}
                  selected={formData ? formData.bankAccountType : ""}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <div className="field">
            <label htmlFor="afpName" className="label">
              AFP
            </label>
            <div className="control is-expanded">
              <input
                type="text"
                className="input is-medium"
                name="afpName"
                id="afpName"
                required
                defaultValue={formData ? formData.afpName : ""}
              />
            </div>
          </div>
        </div>
        <div className="column">
          <div className="field">
            <label htmlFor="afpPercent" className="label">
              % AFP
            </label>
            <div className="control is-expanded">
              <input
                type="number"
                min={1}
                step="any"
                className="input is-medium"
                name="afpPercent"
                id="afpPercent"
                required
                defaultValue={formData ? Number(formData.afpPercent) : 0}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <div className="field">
            <label htmlFor="healthName" className="label">
              Previsión
            </label>
            <div className="control is-expanded">
              <input
                type="text"
                className="input is-medium"
                name="healthName"
                id="healthName"
                required
                defaultValue={formData ? formData.healthName : ""}
              />
            </div>
          </div>
        </div>
        <div className="column">
          <div className="field">
            <label htmlFor="healthPercent" className="label">
              % Previsión
            </label>
            <div className="control is-expanded">
              <input
                type="number"
                min={1}
                step="any"
                className="input is-medium"
                name="healthPercent"
                id="healthPercent"
                required
                defaultValue={formData ? Number(formData.healthPercent) : 0}
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
