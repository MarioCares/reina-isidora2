"use client";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { getErrorMessage } from "@/utils/Errors";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const router = useRouter();
  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data: FormData = new FormData(event.currentTarget);
    try {
      setIsLoading(true);
      const res = await signIn("credentials", {
        redirect: false,
        email: data.get("email"),
        password: data.get("password"),
        callbackUrl: "/",
      });
      if (!res?.error) {
        router.push("/");
      } else {
        setError("Email o contraseña inválida");
      }
    } catch (error) {
      setError(`Error al iniciar sesión: ${getErrorMessage(error)}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="hero is-primary is-fullheight">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-6-tablet is-5-desktop is-4-widescreen">
              {error && <div className="notification is-danger">{error}</div>}
              <h1 className="title">
                Ingreso Usuarios Comunidad Reina Isidora
              </h1>
              <form className="box" onSubmit={onSubmit}>
                <div className="field">
                  <label className="label" htmlFor="email">
                    e-Mail
                  </label>
                  <div className="control has-icons-left has-icons-right">
                    <input
                      id="email"
                      name="email"
                      className="input is-medium"
                      type="text"
                      placeholder="usuario@correo.com"
                      required
                    />
                    <span className="icon is-small is-left">
                      <FontAwesomeIcon icon={faEnvelope} />
                    </span>
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
                    disabled={isLoading}
                    className={`button is-primary is-fullwidth is-medium ${
                      isLoading && "is-loading"
                    }`}
                  >
                    Ingresar
                  </button>
                </div>
              </form>
              <div className="level box">
                <div className="level-left">
                  <div className="level-item">
                    <Link href={"/reset-contraseña"}>Olvidé mi contraseña</Link>
                  </div>
                </div>
                <div className="level-right">
                  <div className="level-item">
                    <Link href={"/registro"}>Crear cuenta</Link>
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
