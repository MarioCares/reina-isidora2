import {
  faBolt,
  faCogs,
  faDollar,
  faDroplet,
  faFileInvoice,
} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import Link from "next/link";
import { isActive } from "@/utils/Strings";
import { usePathname } from "next/navigation";
import Icono from "@/components/ui/Icono";

export function AdministradorMenu() {
  const pathName = usePathname();
  return (
    <>
      <p className="menu-label has-text-lighter">Administración</p>
      <ul className="menu-list">
        <li>
          <Link
            href="/administracion/pagos-servicio"
            className={isActive(
              pathName,
              "/administracion/pagos-servicio",
              false
            )}
          >
            <Icono icon={faFileInvoice} text="Pagos de servicio" />
          </Link>
          <ul>
            <li>
              <Link
                href="/administracion/pagos-servicio/tipo/cge"
                className={isActive(
                  pathName,
                  "/administracion/pagos-servicio/tipo/cge",
                  false
                )}
              >
                <Icono icon={faBolt} text="CGE" />
              </Link>
            </li>
            <li>
              <Link
                href="/administracion/pagos-servicio/tipo/aguaaltiplano"
                className={isActive(
                  pathName,
                  "/administracion/pagos-servicio/tipo/aguaaltiplano",
                  false
                )}
              >
                <Icono icon={faDroplet} text="Aguas del Altiplano" />
              </Link>
            </li>
            <li>
              <Link
                href="/administracion/pagos-servicio/tipo/pago"
                className={isActive(
                  pathName,
                  "/administracion/pagos-servicio/tipo/pago",
                  false
                )}
              >
                <Icono icon={faDollar} text="Otros Pagos" />
              </Link>
            </li>
          </ul>
        </li>
        <li>
          <a href="#" className="">
            <Icono icon={faCogs} text="Configuración" />
          </a>
        </li>
      </ul>
    </>
  );
}
