"use client";

import React, { useEffect } from "react";
import useCRUDApartment from "@/hooks/departamentos/useCRUDApartment";
import { useUiContext } from "@/context/UiContext";
import { Apartment } from "@prisma/client";
import Link from "next/link";
import Icono from "@/components/ui/Icono";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";

export default function TableApartments({}) {
  const { loadingApartment, apartments, handleGetApartments, statusAparment } =
    useCRUDApartment();
  const { setIsPageLoaderVisible } = useUiContext();

  useEffect(() => {
    setIsPageLoaderVisible(loadingApartment);
    handleGetApartments();
  }, [loadingApartment]);

  return (
    <div className="table-container">
      <table className="table is-bordered is-narrow is-fullwidth">
        <thead>
          <tr>
            <th>Nº Departamento</th>
            <th>MTS2</th>
            <th>Prorateo</th>
            <th>Propietario/Responsable</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {apartments.map((apartment: Apartment) => (
            <tr key={apartment.id}>
              <td>{Number(apartment.number)}</td>
              <td>{Number(apartment.mts2)}</td>
              <td>{Number(apartment.prorating)}</td>
              <td>{apartment.apartmentOwnerResponsableName}</td>
              <td>
                <Link
                  href={`/administracion/departamentos/${apartment.id}`}
                  className="button is-primary"
                >
                  <Icono icon={faCircleInfo} />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th colSpan={6} className="inline-text has-text-right"></th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
