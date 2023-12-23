import Link from "next/link";
import React from "react";

export default function ItemNotFound({
  subtitle,
  link,
}: {
  subtitle: string;
  link: string;
}) {
  return (
    <div className="is-flex is-justify-content-center is-align-items-center box">
      <div className="has-text-centered">
        <h1 className="title is-1">Error</h1>
        <h2 className="subtitle">{subtitle}</h2>
        <Link href={link} className="button is-primary">
          Volver a Listado
        </Link>
      </div>
    </div>
  );
}
