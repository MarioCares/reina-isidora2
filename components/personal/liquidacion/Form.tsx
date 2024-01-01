import React, { FormEvent } from "react";
import { IMapString } from "@/interfaces/IMap";
import { Payroll } from "@prisma/client";
import { SelectFromMap } from "@/utils/Select";
import { dateTimeToYearMonthEn } from "@/utils/Strings";

interface HeaderPayrollFormProps {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  initialWorker: string;
  workers: IMapString[];
  formData?: Payroll;
}

export function HeaderPayrollForm({
  onSubmit,
  initialWorker,
  formData,
  workers,
}: HeaderPayrollFormProps) {
  return (
    <form onSubmit={onSubmit} id="form-payroll">
      <div className="columns">
        <div className="column">
          <div className="field">
            <label htmlFor="workerId" className="label">
              Trabajador
            </label>
            <div className="control-is-expanded">
              <div className="select is-fullwidth is-medium">
                <SelectFromMap
                  name={"workerId"}
                  map={workers}
                  selected={
                    formData ? formData.workerId.toString() : initialWorker
                  }
                />
              </div>
            </div>
          </div>
        </div>
        <div className="column">
          <div className="field">
            <label htmlFor="payrollAt" className="label">
              Mes-Año
            </label>
            <div className="control is-expanded">
              <input
                type="month"
                className="input is-medium"
                name="payrollAt"
                id="payrollAt"
                required
                defaultValue={
                  formData ? dateTimeToYearMonthEn(formData.payrollAt) : ""
                }
              />
            </div>
          </div>
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <div className="field">
            <label htmlFor="workedDays" className="label">
              Días trabajados
            </label>
            <div className="control is-expanded">
              <input
                min={1}
                type="number"
                className="input is-medium"
                name="workedDays"
                id="workedDays"
                required
                defaultValue={formData ? formData.workedDays : 0}
              />
            </div>
          </div>
        </div>
        <div className="column">
          <div className="field">
            <label htmlFor="absenceDays" className="label">
              Días ausente
            </label>
            <div className="control is-expanded">
              <input
                type="number"
                min={0}
                step="any"
                className="input is-medium"
                name="absenceDays"
                id="absenceDays"
                required
                defaultValue={formData ? Number(formData.absenceDays) : 0}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <div className="field">
            <label htmlFor="hours100" className="label">
              Horas 100%
            </label>
            <div className="control is-expanded">
              <input
                min={0}
                step="any"
                type="number"
                className="input is-medium"
                name="hours100"
                id="hours100"
                required
                defaultValue={formData ? Number(formData.hours100) : 0}
              />
            </div>
          </div>
        </div>
        <div className="column">
          <div className="field">
            <label htmlFor="hours50" className="label">
              Horas 50%
            </label>
            <div className="control is-expanded">
              <input
                type="number"
                min={1}
                step="any"
                className="input is-medium"
                name="hours50"
                id="hours50"
                required
                defaultValue={formData ? Number(formData.hours50) : 0}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <div className="field">
            <label htmlFor="payAdvance" className="label">
              Anticipo
            </label>
            <div className="control is-expanded">
              <input
                type="number"
                min={1}
                step="any"
                className="input is-medium"
                name="payAdvance"
                id="payAdvance"
                required
                defaultValue={formData ? Number(formData.payAdvance) : 0}
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
