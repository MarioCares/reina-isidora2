import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";
import TableApartments from "@/components/departamentos/TableApartments";
import AddApartmentButton from "@/components/departamentos/AddApartmentButton";

export default async function ApartmentsPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }

  return (
    <div className="p-3">
      <nav className="level">
        <div className="level-left">
          <div className="level-item">
            <h1 className="title is-2">Departamentos</h1>
          </div>
        </div>
        <div className="level-right">
          <AddApartmentButton />
        </div>
      </nav>
      <div className="columns is-variable is-desktop">
        <div className="column">
          <TableApartments />
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
