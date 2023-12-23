"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import useRegister from "@/hooks/auth/useRegister";
import { FormEvent, useEffect } from "react";
import { IRegister } from "@/interfaces/auth/IRegister";
import { signIn } from "next-auth/react";

export default function RegisterPage() {
  const { loadingRegister, handleRegister, statusRegister } = useRegister();

  useEffect(() => {
    if (statusRegister) {
      if (statusRegister === "ok") {
        signIn(undefined, { callbackUrl: "/" });
      }
    }
  }, [statusRegister]);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    handleRegister({
      name: `${data.get("name")} ${data.get("lastName")}`,
      email: data.get("email"),
      password: data.get("password"),
    } as IRegister);
  };

  return (
    <section className="hero is-primary is-fullheight">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-6-tablet is-5-desktop is-4-widescreen">
              {statusRegister && statusRegister !== "ok" && (
                <div className="notification is-danger">{statusRegister}</div>
              )}
              <h1 className="title">
                Registro Usuarios Comunidad Reina Isidora
              </h1>
              <form className="box" onSubmit={onSubmit}>
                <div className="field">
                  <label className="label" htmlFor="name">
                    Nombres
                  </label>
                  <div className="control">
                    <input
                      id="name"
                      name="name"
                      className="input is-medium"
                      placeholder="Pedro Pablo"
                      required
                      autoFocus
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label" htmlFor="lastName">
                    Apellidos
                  </label>
                  <div className="control">
                    <input
                      id="lastName"
                      name="lastName"
                      className="input is-medium"
                      placeholder="Pérez Pereira"
                      required
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label" htmlFor="email">
                    e-Mail
                  </label>
                  <div className="control">
                    <input
                      id="email"
                      name="email"
                      className="input is-medium"
                      placeholder="usuario@correo.com"
                      required
                      type="email"
                    />
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="password" className="label">
                    Contraseña
                  </label>
                  <div className="control has-icons-left">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="*******"
                      className="input is-medium"
                      required
                    />
                    <span className="icon is-small is-left">
                      <FontAwesomeIcon icon={faLock} />
                    </span>
                  </div>
                </div>
                <div className="field">
                  <button
                    type="submit"
                    disabled={loadingRegister}
                    className={`button is-primary is-fullwidth is-medium ${
                      loadingRegister && "is-loading"
                    }`}
                  >
                    Registrar
                  </button>
                </div>
              </form>
              <div className="level box">
                <div className="level-left">
                  <div className="level-item">
                    <Link href="/login">Ya tengo cuenta</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
