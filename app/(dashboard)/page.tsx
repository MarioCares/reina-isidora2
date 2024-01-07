import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { IGroupedByTypeServicePayment } from "@/interfaces/pagos-servicio/Agreggations";
import { serviceTypes } from "@/utils/Strings";

export const revalidate: number = 0;

const getGroupedByTypeServicePayments = async (): Promise<
  IGroupedByTypeServicePayment[]
> => {
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, "0");
  const data = await fetch(
    `http://localhost:3000/api/service-payment?grouped=1&yearMonth=${year}-${month}`,
    {
      next: {
        revalidate: 0,
      },
    }
  );
  return await data.json();
};

export default async function LandingPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }

  const groupedByTypeServicePayments = await getGroupedByTypeServicePayments();
  console.log("groupedByTypeServicePayments", groupedByTypeServicePayments);
  return (
    <div className="p-3">
      <div className="columns is-variable is-desktop">
        <div className="column">
          <h1 className="title is-2">Escritorio</h1>
        </div>
      </div>
      <hr />
      <div className="box">
        <h1 className="title is-3">Pagos de Servicios</h1>
        <div className="columns is-variable is-desktop">
          {groupedByTypeServicePayments.map(
            (type: IGroupedByTypeServicePayment) => (
              <div key={type.servicePaymentType} className="column">
                <div className="card">
                  <div className="card-header">
                    <div className="card-header-title">
                      {serviceTypes[type.servicePaymentType]}
                    </div>
                  </div>
                  <div className="card-content">
                    <p className="is-size-3">
                      $ {type.sum.toLocaleString("de-DE")}
                    </p>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>

      <div className="columns is-variable">
        <div className="column is-4-desktop is-6-tablet">
          <article className="message is-info">
            <div className="message-header">
              <p>Info</p>
              <button className="delete" aria-label="delete"></button>
            </div>
            <div className="message-body">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              <strong>Pellentesque risus mi</strong>, tempus quis placerat ut,
              porta nec nulla. Vestibulum rhoncus ac ex sit amet fringilla.
              Nullam gravida purus diam, et dictum
              <a>felis venenatis</a> efficitur. Aenean ac
              <em>eleifend lacus</em>, in mollis lectus. Donec sodales, arcu et
              sollicitudin porttitor, tortor urna tempor ligula, id porttitor mi
              magna a neque. Donec dui urna, vehicula et sem eget, facilisis
              sodales sem.
            </div>
          </article>
        </div>
        <div className="column is-4-desktop is-6-tablet">
          <article className="message is-success">
            <div className="message-header">
              <p>Info</p>
              <button className="delete" aria-label="delete"></button>
            </div>
            <div className="message-body">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              <strong>Pellentesque risus mi</strong>, tempus quis placerat ut,
              porta nec nulla. Vestibulum rhoncus ac ex sit amet fringilla.
              Nullam gravida purus diam, et dictum
              <a>felis venenatis</a> efficitur. Aenean ac
              <em>eleifend lacus</em>, in mollis lectus. Donec sodales, arcu et
              sollicitudin porttitor, tortor urna tempor ligula, id porttitor mi
              magna a neque. Donec dui urna, vehicula et sem eget, facilisis
              sodales sem.
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
