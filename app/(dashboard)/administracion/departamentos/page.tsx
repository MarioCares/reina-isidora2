import { Apartment } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";

export const revalidate: number = 0;

const getApartments = async (): Promise<Apartment[]> => {
  // const data = await fetch("http://localhost:3000/api/apartments", {
  //   next: {
  //     revalidate: 0,
  //   },
  // });
  // return (await data.json()) as Apartment[];
  return [];
};

export default async function ApartmentsPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  const apartments = await getApartments();

  return (
    <div className="p-3">
      <nav className="level">
        <div className="level-left">
          <div className="level-item">
            <h1 className="title is-2">Departamentos</h1>
          </div>
        </div>
        <div className="level-right"></div>
      </nav>
      <div className="columns is-variable is-desktop">
        <div className="column">
          <div className="table-container">
            <table className="table is-bordered is-narrow is-fullwidth">
              <thead>
                <tr>
                  <th>Nº Departamento - Rol Departamento</th>
                  <th>Prorateo</th>
                  <th>MTS2</th>
                  <th>Nº Bodega - Rol Bodega</th>
                  <th>Nº Estacionamiento - Rol Estacionamiento - Ubicación</th>
                  <th>Propietario/Responsable</th>
                  <th>Contacto Emergencia</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody></tbody>
              <tfoot>
                <tr>
                  <th colSpan={6} className="inline-text has-text-right"></th>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
      <div className="columns is-variable is-desktop">
        <div className="column">
          <h1>Chart</h1>
        </div>
      </div>
    </div>
  );
}
