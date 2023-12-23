import Link from "next/link";

export default async function NotFoundPage() {
  return (
    <div
      className="is-flex is-justify-content-center is-align-items-center"
      style={{ height: "100%" }}
    >
      <div className="has-text-centered">
        <h1 className="title is-1">404</h1>
        <h2 className="subtitle">Esta página no existe</h2>
        <Link href="/" className="button is-primary">
          Volver a Inicio
        </Link>
      </div>
    </div>
  );
}
