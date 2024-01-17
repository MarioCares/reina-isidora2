"use client";

import { FormEvent, useState } from "react";
import Icono from "@/components/ui/Icono";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Modal from "@/components/ui/Modal";
import { SendFormModal } from "@/components/ui/Buttons";
import useCRUDApartment from "@/hooks/departamentos/useCRUDApartment";
import { ParkingFloor } from "@prisma/client";
import { IApartment } from "@/interfaces/IApartment";
import OkNotification from "@/components/ui/OkNotification";
import ApartmentForm from "@/components/departamentos/ApartmentForm";

export default function AddApartmentButton({}) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { handleAddApartment, loadingApartment, statusAparment } =
    useCRUDApartment();

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    handleAddApartment({
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
    <>
      <button
        className="button is-primary"
        onClick={() => setIsModalOpen(true)}
      >
        <Icono icon={faPlus} text={"Agregar"} />
      </button>
      <Modal
        closeModal={() => setIsModalOpen(!isModalOpen)}
        isOpen={isModalOpen}
        title="Nuevo Departamento"
        successButton={
          <SendFormModal form="form-add-apartment" className="is-success">
            Guardar
          </SendFormModal>
        }
        isLoading={loadingApartment}
      >
        {statusAparment === "ok" && (
          <OkNotification
            title="Departamento agregado!"
            link=""
            buttonText="Volver a listado"
            action={() => window.location.reload()}
          />
        )}
        {statusAparment && statusAparment !== "ok" && (
          <div className="notification is-danger">{statusAparment}</div>
        )}
        <ApartmentForm onSubmit={onSubmit} />
      </Modal>
    </>
  );
}
