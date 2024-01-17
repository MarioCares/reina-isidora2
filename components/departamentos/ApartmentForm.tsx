import React, { FormEvent } from "react";
import { Apartment } from "@prisma/client";
import { SelectFromMap } from "@/utils/Select";
import { IMapString } from "@/interfaces/IMap";

interface ApartmentFormProps {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  formData?: Apartment;
}

const parkingPlace: IMapString[] = [
  {
    value: "SUPERIOR",
    label: "Superior",
  },
  {
    value: "SUBTERRANEO",
    label: "Subterráneo",
  },
];

export default function ApartmentForm({
  onSubmit,
  formData,
}: ApartmentFormProps) {
  return (
    <form onSubmit={onSubmit} id="form-add-apartment">
      <div className="columns">
        <div className="column">
          <div className="field">
            <label htmlFor="number" className="label">
              Nº Departamento
            </label>
            <div className="control is-expanded">
              <input
                type="number"
                className="input is-medium"
                name="number"
                id="number"
                required
                defaultValue={formData ? formData.number : ""}
              />
            </div>
          </div>
        </div>
        <div className="column">
          <div className="field">
            <label htmlFor="storageNumber" className="label">
              Nº Bodega
            </label>
            <div className="control is-expanded">
              <input
                type="number"
                className="input is-medium"
                name="storageNumber"
                id="storageNumber"
                required
                defaultValue={formData ? formData.storageNumber : ""}
              />
            </div>
          </div>
        </div>
        <div className="column">
          <div className="field">
            <label htmlFor="parkingNumber" className="label">
              Nº Estacionamiento
            </label>
            <div className="control is-expanded">
              <input
                type="number"
                className="input is-medium"
                name="parkingNumber"
                id="parkingNumber"
                required
                defaultValue={formData ? formData.parkingNumber : ""}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <div className="field">
            <label htmlFor="mts2" className="label">
              Metros Cuadrados
            </label>
            <div className="control is-expanded">
              <input
                type="number"
                step="any"
                className="input is-medium"
                name="mts2"
                id="mts2"
                required
                defaultValue={formData ? Number(formData.mts2) : ""}
              />
            </div>
          </div>
        </div>
        <div className="column">
          <div className="field">
            <label htmlFor="prorating" className="label">
              Prorrateo
            </label>
            <div className="control is-expanded">
              <input
                type="number"
                step="any"
                className="input is-medium"
                name="prorating"
                id="prorating"
                required
                defaultValue={formData ? Number(formData.prorating) : ""}
              />
            </div>
          </div>
        </div>
        <div className="column">
          <div className="field">
            <label htmlFor="parking" className="label">
              Piso Estacionamiento
            </label>
            <div className="control is-expanded">
              <div className="select is-fullwidth is-medium">
                <SelectFromMap
                  name="parking"
                  map={parkingPlace}
                  selected={formData ? formData.parking : "SUPERIOR"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <div className="field">
            <label htmlFor="rol" className="label">
              Rol Departamento
            </label>
            <div className="control is-expanded">
              <input
                type="text"
                className="input is-medium"
                name="rol"
                id="rol"
                required
                defaultValue={formData ? formData.rol : ""}
              />
            </div>
          </div>
        </div>
        <div className="column">
          <div className="field">
            <label htmlFor="storageRol" className="label">
              Rol Bodega
            </label>
            <div className="control is-expanded">
              <input
                type="text"
                className="input is-medium"
                name="storageRol"
                id="storageRol"
                required
                defaultValue={formData ? formData.storageRol : ""}
              />
            </div>
          </div>
        </div>
        <div className="column">
          <div className="field">
            <label htmlFor="parkingRol" className="label">
              Rol Estacionamiento
            </label>
            <div className="control is-expanded">
              <input
                type="text"
                className="input is-medium"
                name="parkingRol"
                id="parkingRol"
                required
                defaultValue={formData ? formData.parkingRol : ""}
              />
            </div>
          </div>
        </div>
      </div>
      <h1 className="title is-4">Datos del propietario</h1>
      <div className="columns">
        <div className="column">
          <div className="field">
            <label htmlFor="apartmentOwnerResponsableName" className="label">
              Nombre Completo
            </label>
            <div className="control is-expanded">
              <input
                type="text"
                className="input is-medium"
                name="apartmentOwnerResponsableName"
                id="apartmentOwnerResponsableName"
                required
                defaultValue={
                  formData ? formData.apartmentOwnerResponsableName : ""
                }
              />
            </div>
          </div>
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <div className="field">
            <label
              htmlFor="apartmentOwnerResponsablePhoneNumber"
              className="label"
            >
              Teléfono
            </label>
            <div className="control is-expanded">
              <input
                type="text"
                className="input is-medium"
                name="apartmentOwnerResponsablePhoneNumber"
                id="apartmentOwnerResponsablePhoneNumber"
                required
                defaultValue={
                  formData ? formData.apartmentOwnerResponsablePhoneNumber : ""
                }
              />
            </div>
          </div>
        </div>
        <div className="column">
          <div className="field">
            <label htmlFor="apartmentOwnerResponsableEmail" className="label">
              E-Mail
            </label>
            <div className="control is-expanded">
              <input
                type="text"
                className="input is-medium"
                name="apartmentOwnerResponsableEmail"
                id="apartmentOwnerResponsableEmail"
                required
                defaultValue={
                  formData ? formData.apartmentOwnerResponsableEmail : ""
                }
              />
            </div>
          </div>
        </div>
      </div>
      <h1 className="title is-4">En caso de emergencia</h1>
      <div className="columns">
        <div className="column">
          <div className="field">
            <label htmlFor="emergencyContactName" className="label">
              Nombre Completo
            </label>
            <div className="control is-expanded">
              <input
                type="text"
                className="input is-medium"
                name="emergencyContactName"
                id="emergencyContactName"
                required
                defaultValue={formData ? formData.emergencyContactName : ""}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <div className="field">
            <label htmlFor="emergencyContactPhoneNumber" className="label">
              Teléfono
            </label>
            <div className="control is-expanded">
              <input
                type="text"
                className="input is-medium"
                name="emergencyContactPhoneNumber"
                id="emergencyContactPhoneNumber"
                required
                defaultValue={
                  formData ? formData.emergencyContactPhoneNumber : ""
                }
              />
            </div>
          </div>
        </div>
        <div className="column">
          <div className="field">
            <label htmlFor="emergencyContactEmail" className="label">
              E-Mail
            </label>
            <div className="control is-expanded">
              <input
                type="text"
                className="input is-medium"
                name="emergencyContactEmail"
                id="emergencyContactEmail"
                required
                defaultValue={formData ? formData.emergencyContactEmail : ""}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <div className="field">
            <label htmlFor="notes" className="label">
              Observaciones
            </label>
            <div className="control is-expanded">
              <textarea
                name="notes"
                id="notes"
                className="textarea"
                defaultValue={formData ? formData.notes : ""}
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
