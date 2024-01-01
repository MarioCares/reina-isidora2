import { Metadata } from "next";
import React from "react";
import "bulma/css/bulma.min.css";
import "bulma-checkradio/dist/css/bulma-checkradio.min.css";
import "bulma-switch/dist/css/bulma-switch.min.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "../public/style.css";

export const metadata: Metadata = {
  title: "Autenticación - Comunidad Reina Isidora",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title></title>
      </head>
      <body>{children}</body>
    </html>
  );
}
