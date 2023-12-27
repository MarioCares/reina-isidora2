import { faCogs, faFileInvoice } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import Link from "next/link";
import { isActive, serviceTypes } from "@/utils/Strings";
import { usePathname } from "next/navigation";
import Icono from "@/components/ui/Icono";
import { ServicePaymentType } from ".prisma/client";
import { IconsByString } from "@/utils/Icons";

export function AdministradorMenu() {
  const pathName = usePathname();
  return (
    <>
      <p className="menu-label has-text-lighter">Administración</p>
      <ul className="menu-list">
        <li>
          <Link
            href={"/administracion/pagos-servicio"}
            className={isActive(
              pathName,
              "/administracion/pagos-servicio",
              false
            )}
          >
            <Icono icon={faFileInvoice} text="Pagos de servicio" />
          </Link>
          <ul>
            {Object.values(ServicePaymentType).map((value) => {
              return (
                <li key={value}>
                  <Link
                    href={`/administracion/pagos-servicio/tipo/${value}`}
                    className={isActive(
                      pathName,
                      `/administracion/pagos-servicio/tipo/${value}`,
                      false
                    )}
                  >
                    <Icono
                      icon={IconsByString[value]}
                      text={serviceTypes[value]}
                    />
                  </Link>
                </li>
              );
            })}
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
