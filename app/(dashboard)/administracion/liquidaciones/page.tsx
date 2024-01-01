import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import { authOptions } from "@/lib/auth";
import Icono from "@/components/ui/Icono";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Payroll } from "@prisma/client";
import { dateTimeToDateEs } from "@/utils/Strings";

export const revalidate: number = 0;

const getPayrolls = async (addCalculated: boolean): Promise<Payroll[]> => {
  const data = await fetch(
    `http://localhost:3000/api/payroll/?${
      addCalculated ? "addCalculated=1" : ""
    }`,
    {
      next: {
        revalidate: 0,
      },
    }
  );
  return (await data.json()) as Payroll[];
};

interface PayrollPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}
export default async function PayrollsPage({ searchParams }: PayrollPageProps) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }

  const payrolls = await getPayrolls(searchParams.addCalculated !== undefined);

  return (
    <div className="p-3">
      <nav className="level">
        <div className="level-left">
          <div className="level-item">
            <h1 className="title is-2">Liquidaciones</h1>
            <h1 className="title is-2"></h1>
          </div>
        </div>
        <form className="level-right">
          <div className="level-item">
            <div className="field">
              <input
                className="switch is-medium"
                id="addCalculated"
                type="checkbox"
                name="addCalculated"
                defaultChecked={searchParams.addCalculated !== undefined}
              />
              <label htmlFor="addCalculated">Agregar Calculadas</label>
            </div>
          </div>
          <div className="level-item">
            <button className="button is-info" type="submit">
              <Icono icon={faMagnifyingGlass} />
            </button>
          </div>
        </form>
      </nav>
      <div className="columns is-variable is-desktop">
        <div className="column">
          <div className="table-container">
            <table className="table is-bordered is-narrow is-fullwidth">
              <thead>
                <tr>
                  <th>Mes-Año</th>
                  <th>Trabajador</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {payrolls.map((payroll) => (
                  <tr key={payroll.id}>
                    <td>{dateTimeToDateEs(payroll.payrollAt)}</td>
                    <td>{payroll.workerId}</td>
                    <td></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="columns is-variable is-desktop">
        <div className="column"></div>
      </div>
    </div>
  );
}
