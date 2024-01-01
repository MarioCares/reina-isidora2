import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";
import { PayrollWithWorker } from "@/interfaces/personal/IPayroll";
import { dateTimeToYearMonthEs } from "@/utils/Strings";
import UpdatePayrollButton from "@/components/personal/liquidacion/UpdatePayrollButton";
import { IMapString } from "@/interfaces/IMap";
import { Worker } from "@prisma/client";

export const revalidate: number = 0;

const getWorkersMap = async (): Promise<IMapString[]> => {
  const data = await fetch(`http://localhost:3000/api/worker`, {
    next: {
      revalidate: 0,
    },
  });
  const workers = (await data.json()) as Worker[];
  return workers.map((worker: Worker) => ({
    value: worker.id.toString(),
    label: worker.name,
  }));
};

const getPayroll = async (id: number): Promise<PayrollWithWorker> => {
  const data = await fetch(`http://localhost:3000/api/payroll/${id}`, {
    next: {
      revalidate: 0,
    },
  });
  return await data.json();
};

export default async function PayrollPage({
  params,
}: {
  params: { id: number };
}) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }

  const payroll = await getPayroll(Number(params.id));
  const workersMap = await getWorkersMap();
  const baseHourAmount = Math.round(
    ((payroll.worker.salaryAmount / 30) * 28) / 180
  );
  const baseSalary = Math.round(
    (payroll.worker.salaryAmount / 30) * Number(payroll.workedDays)
  );
  const amount50 = Math.round(baseHourAmount * Number(payroll.hours50) * 1.5);
  const amount100 = Math.round(baseHourAmount * Number(payroll.hours100) * 2);
  const taxable = baseSalary + amount50 + amount100;

  const afp = Math.round((taxable * Number(payroll.worker.afpPercent)) / 100);
  const health = Math.round(
    (taxable * Number(payroll.worker.healthPercent)) / 100
  );
  const unemploymentFund = Math.round((taxable * 0.6) / 100);
  const legalDiscount = afp + health + unemploymentFund;

  const mealBonus = Math.round(
    (Number(payroll.worker.mealBonus) / Number(payroll.worker.baseDays)) *
      payroll.workedDays
  );
  const transportationBonus = Math.round(
    (Number(payroll.worker.transportationBonus) /
      Number(payroll.worker.baseDays)) *
      payroll.workedDays
  );
  const accountabilityBonus = Math.round(
    (Number(payroll.worker.accountabilityBonus) /
      Number(payroll.worker.baseDays)) *
      payroll.workedDays
  );
  const otherBonus = Math.round(
    (Number(payroll.worker.otherBonus) / Number(payroll.worker.baseDays)) *
      payroll.workedDays
  );

  const nonTaxable =
    mealBonus + transportationBonus + accountabilityBonus + otherBonus;

  const totalEarnings = nonTaxable + taxable;

  return (
    <div className="p-3">
      <nav className="level">
        <div className="level-left">
          <div className="level-item">
            <h1 className="title is-2">
              Liquidación {dateTimeToYearMonthEs(payroll.payrollAt)} .-{" "}
              {payroll.worker.name}
            </h1>
          </div>
        </div>
        <div className="level-right">
          <UpdatePayrollButton workers={workersMap} formData={payroll} />
        </div>
      </nav>
      <div className="columns is-variable is-desktop pb-2">
        <div className="column box">
          <h1 className="title is-3 has-text-centered">Detalle</h1>
          <table className="table is-fullwidth">
            <tbody>
              <tr>
                <td>
                  Días Trabajados:{" "}
                  <strong>
                    {payroll.workedDays}/{payroll.worker.baseDays}
                  </strong>
                </td>
                <td>
                  Ausencias: <strong>{payroll.absenceDays}</strong>
                </td>
                <td>
                  Hrs. Ext. 50%: <strong>{Number(payroll.hours50)}</strong>
                </td>
                <td>
                  Hrs. Ext. 100%: <strong>{Number(payroll.hours100)}</strong>
                </td>
              </tr>
              <tr>
                <td>
                  AFP {payroll.worker.afpName}:{" "}
                  <strong>{Number(payroll.worker.afpPercent)}%</strong>
                </td>
                <td>
                  Salud {payroll.worker.healthName}:{" "}
                  <strong>{Number(payroll.worker.healthPercent)}%</strong>
                </td>
                <td>
                  Fondo cesantía: <strong>0.6%</strong>{" "}
                </td>
                <td className="inline-text">
                  Valor Hora Base: $
                  <strong>{baseHourAmount.toLocaleString("de-DE")}</strong>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="columns is-variable is-desktop box p-0">
        <div className="column">
          <h1 className="title is-3 has-text-centered">Haberes</h1>
          <div className="table-container">
            <table className="table is-bordered is-fullwidth">
              <tbody>
                <tr>
                  <th colSpan={2} className="has-text-centered">
                    Imponibles
                  </th>
                </tr>
                <tr>
                  <td>Sueldo Base</td>
                  <td className="inline-text has-text-right">
                    $ {baseSalary.toLocaleString("de-DE")}
                  </td>
                </tr>
                <tr>
                  <td>Hrs. Extras 50%</td>
                  <td className="inline-text has-text-right">
                    $ {amount50.toLocaleString("de-DE")}
                  </td>
                </tr>
                <tr>
                  <td>Hrs. Extras 100%</td>
                  <td className="inline-text has-text-right">
                    $ {amount100.toLocaleString("de-DE")}
                  </td>
                </tr>
                <tr>
                  <th>Total Imponible</th>
                  <th className="inline-text has-text-right">
                    $ {taxable.toLocaleString("de-DE")}
                  </th>
                </tr>
                <tr>
                  <th colSpan={2} className="has-text-centered">
                    No Imponibles
                  </th>
                </tr>
                <tr>
                  <td>Colación</td>
                  <td className="inline-text has-text-right">
                    $ {mealBonus?.toLocaleString("de-DE")}
                  </td>
                </tr>
                <tr>
                  <td>Movilización</td>
                  <td className="inline-text has-text-right">
                    $ {transportationBonus?.toLocaleString("de-DE")}
                  </td>
                </tr>
                <tr>
                  <td>Bono responsabilidad</td>
                  <td className="inline-text has-text-right">
                    $ {accountabilityBonus?.toLocaleString("de-DE")}
                  </td>
                </tr>
                <tr>
                  <td>Otros bonos</td>
                  <td className="inline-text has-text-right">
                    $ {otherBonus?.toLocaleString("de-DE")}
                  </td>
                </tr>
                <tr>
                  <th>Total No Imponible</th>
                  <th className="inline-text has-text-right">
                    $ {nonTaxable.toLocaleString("de-DE")}
                  </th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="column">
          <h1 className="title is-3 has-text-centered">Descuentos</h1>
          <div className="table-container">
            <table className="table is-bordered is-fullwidth">
              <tbody>
                <tr>
                  <th colSpan={2} className="has-text-centered">
                    Legales
                  </th>
                </tr>
                <tr>
                  <td>Cotización AFP</td>
                  <td className="inline-text has-text-right">
                    $ {afp.toLocaleString("de-DE")}
                  </td>
                </tr>
                <tr>
                  <td>Plan salud</td>
                  <td className="inline-text has-text-right">
                    $ {health.toLocaleString("de-DE")}
                  </td>
                </tr>
                <tr>
                  <td>Fondo cesantía</td>
                  <td className="inline-text has-text-right">
                    $ {unemploymentFund.toLocaleString("de-DE")}
                  </td>
                </tr>
                <tr>
                  <th>Total descuentos legales</th>
                  <th className="inline-text has-text-right">
                    $ {legalDiscount.toLocaleString("de-DE")}
                  </th>
                </tr>
                <tr>
                  <td colSpan={2} className="has-text-white">
                    dummy
                  </td>
                </tr>
                <tr>
                  <th>Total Haberes</th>
                  <th className="inline-text has-text-right">
                    $ {totalEarnings.toLocaleString("de-DE")}
                  </th>
                </tr>
                <tr>
                  <th>Anticipo</th>
                  <th className="inline-text has-text-right">
                    $ {Number(payroll.payAdvance).toLocaleString("de-DE")}
                  </th>
                </tr>
                <tr>
                  <th>Líquido a pagar</th>
                  <th className="inline-text has-text-right">
                    ${" "}
                    {(
                      totalEarnings -
                      legalDiscount -
                      Number(payroll.payAdvance)
                    ).toLocaleString("de-DE")}
                  </th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
