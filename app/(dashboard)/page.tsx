import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function LandingPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  return (
    <div className="p-3">
      <div className="columns is-variable is-desktop">
        <div className="column">
          <h1 className="title">Dashboard</h1>
        </div>
      </div>
      <div className="columns is-variable is-desktop">
        <div className="column">
          <div className="card has-background-primary has-text-white">
            <div className="card-header">
              <div className="card-header-title has-text-white">
                Top Seller Total
              </div>
            </div>
            <div className="card-content">
              <p className="is-size-3">56,590</p>
            </div>
          </div>
        </div>
        <div className="column">
          <div className="card has-background-warning has-text-black">
            <div className="card-header">
              <div className="card-header-title has-text-black is-uppercase">
                Revenue
              </div>
            </div>
            <div className="card-content">
              <p className="is-size-3">55%</p>
            </div>
          </div>
        </div>
        <div className="column">
          <div className="card has-background-info has-text-white">
            <div className="card-header">
              <div className="card-header-title has-text-white is-uppercase">
                Feedback
              </div>
            </div>
            <div className="card-content">
              <p className="is-size-3">78 %</p>
            </div>
          </div>
        </div>
        <div className="column">
          <div className="card has-background-danger has-text-white">
            <div className="card-header">
              <div className="card-header-title has-text-white">Orders</div>
            </div>
            <div className="card-content">
              <p className="is-size-3">425k</p>
            </div>
          </div>
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
