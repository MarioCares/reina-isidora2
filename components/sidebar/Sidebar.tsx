"use client";

import React from "react";
import { faTachometerAlt } from "@fortawesome/free-solid-svg-icons";
import { useUiContext } from "@/context/UiContext";
import { AdministradorMenu } from "@/components/sidebar/AdministradorMenu";
import { isActive } from "@/utils/Strings";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Icono from "@/components/ui/Icono";

export function Sidebar({ role }: { role: string }) {
  const { isSideBarVisible } = useUiContext();
  const pathName = usePathname();
  return (
    <div
      className={`menu-container px-2 has-background-white ${
        isSideBarVisible && "active"
      }`}
    >
      <div className="menu-wrapper py-1">
        <aside className="menu">
          <p className="menu-label has-text-lighter">General</p>
          <ul className="menu-list">
            <li>
              <Link href="/" className={isActive(pathName, ["/"], false)}>
                <Icono icon={faTachometerAlt} text="Escritorio" />
              </Link>
            </li>
          </ul>
          {role === "ADMIN" && <AdministradorMenu />}
          <p className="menu-label has-text-lighter">Other</p>
          <ul className="menu-list">
            <li>
              <a href="#" className="has-text-black">
                <i className="fas fa-comments icon"></i>
                Chats
              </a>
            </li>
            <li>
              <a href="#" className="has-text-black">
                <i className="fas fa-info-circle icon"></i>
                Extras
              </a>
            </li>
          </ul>
        </aside>
      </div>
    </div>
  );
}
