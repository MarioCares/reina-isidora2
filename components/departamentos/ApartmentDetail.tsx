"use client";
import useCRUDApartment from "@/hooks/departamentos/useCRUDApartment";
import { useUiContext } from "@/context/UiContext";
import React, { FormEvent, useEffect, useState } from "react";
import { Apartment, ParkingFloor } from "@prisma/client";
import ApartmentForm from "@/components/departamentos/ApartmentForm";
import Icono from "@/components/ui/Icono";
import { faBuilding, faPeopleGroup } from "@fortawesome/free-solid-svg-icons";
import { IApartment } from "@/interfaces/IApartment";
import OkNotification from "@/components/ui/OkNotification";

export default function ApartmentDetail({ id }: { id: number }) {
  const [activeTab, setActiveTab] = useState<string>("apartment");
  const {
    loadingApartment,
    apartments,
    handleGetApartment,
    handleUpdateApartment,
    statusAparment,
  } = useCRUDApartment();
  const { setIsPageLoaderVisible } = useUiContext();

  useEffect(() => {
    if (apartments.length === 0) {
      handleGetApartment(id);
    }
  }, []);

  useEffect(() => {
    setIsPageLoaderVisible(loadingApartment);
  }, [loadingApartment]);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    handleUpdateApartment({
      id: (apartments as unknown as Apartment).id,
      apartmentOwnerResponsableEmail: data.get(
        "apartmentOwnerResponsableEmail"
      ),
      apartmentOwnerResponsableName: data.get("apartmentOwnerResponsableName"),
      apartmentOwnerResponsablePhoneNumber: data.get(
        "apartmentOwnerResponsablePhoneNumber"
      ),
      emergencyContactEmail: data.get("emergencyContactEmail"),
      emergencyContactName: data.get("emergencyContactName"),
      emergencyContactPhoneNumber: data.get("emergencyContactPhoneNumber"),
      mts2: Number(data.get("mts2")),
      parkingNumber: Number(data.get("parkingNumber")),
      parkingRol: data.get("parkingRol"),
      prorating: Number(data.get("prorating")),
      rol: data.get("rol"),
      storageNumber: Number(data.get("storageNumber")),
      storageRol: data.get("storageRol"),
      number: Number(data.get("number")),
      notes: data.get("notes"),
      parking: data.get("parking") as ParkingFloor,
    } as IApartment);
  };

  return (
    <div className="p-3">
      <nav className="level">
        <div className="level-left">
          <div className="level-item">
            <h1 className="title is-2">
              Departamento {(apartments as unknown as Apartment).number}
            </h1>
          </div>
        </div>
        <div className="level-right"></div>
      </nav>
      <div className="columns is-variable is-desktop">
        <div className="column">
          <div className="tabs is-boxed">
            <ul>
              <li className={`${activeTab === "apartment" && "is-active"}`}>
                <a onClick={() => setActiveTab("apartment")}>
                  <Icono icon={faBuilding} text="Departamento" />
                </a>
              </li>
              <li className={`${activeTab === "residents" && "is-active"}`}>
                <a onClick={() => setActiveTab("residents")}>
                  <Icono icon={faPeopleGroup} text="Residentes" />
                </a>
              </li>
            </ul>
          </div>
          {activeTab === "apartment" &&
            (apartments as unknown as Apartment).number && (
              <div className="box">
                {statusAparment === "ok" && (
                  <OkNotification
                    title="Departamento Actualizado!"
                    link=""
                    action={() => window.location.reload()}
                    buttonText="Cerrar"
                  />
                )}
                <ApartmentForm
                  onSubmit={onSubmit}
                  formData={apartments as unknown as Apartment}
                />
                {loadingApartment ? (
                  <button className="mt-4 button is-warning is-loading is-disabled" />
                ) : (
                  <button
                    type="submit"
                    form="form-add-apartment"
                    className="mt-4 button is-warning"
                  >
                    Actualizar
                  </button>
                )}
              </div>
            )}
          {activeTab === "residents" && <h1>Residentes</h1>}
        </div>
      </div>
    </div>
  );
}
