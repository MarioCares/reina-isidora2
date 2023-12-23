"use client";

import {
  faHouseUser,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { useUiContext } from "@/context/UiContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { isActive } from "@/utils/Strings";
import Icono from "@/components/ui/Icono";

export function Navbar({ initials }: { initials: string }) {
  const pathName = usePathname();

  const {
    isNavbarVisible,
    isSideBarVisible,
    setIsNavbarVisible,
    setIsSideBarVisible,
  } = useUiContext();

  const onLogOutClick = () => {
    signOut();
  };
  return (
    <nav className="navbar is-fixed-top box-shadow-y">
      <div className="navbar-brand">
        <a
          role="button"
          className="navbar-burger toggler"
          aria-label="menu"
          aria-expanded="false"
          onClick={() => setIsSideBarVisible(!isSideBarVisible)}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>

        <a href="/" className="navbar-item has-text-weight-bold has-text-black">
          Comunidad Reina Isidora
        </a>
        <a
          role="button"
          className="navbar-burger nav-toggler"
          aria-label="menu"
          aria-expanded="false"
          onClick={() => setIsNavbarVisible(!isNavbarVisible)}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div
        className={`navbar-menu has-background-white ${
          isNavbarVisible && "is-active"
        }`}
      >
        <div className="navbar-start">
          <Link
            href={"/"}
            className={`navbar-item ${isActive(pathName, "/", true)}`}
          >
            <Icono icon={faHouseUser} text="Inicio" />
          </Link>
          <a href="#" className="navbar-item">
            About
          </a>
          <a href="#" className="navbar-item">
            Features
          </a>
          <a href="#" className="navbar-item">
            Pricing
          </a>
        </div>
        <div className="navbar-end">
          <a href="#" className="navbar-item">
            Notifications
          </a>
          <div className="navbar-item has-dropdown is-hoverable">
            <a href="#" className="navbar-link">
              {initials}
            </a>
            <div className="navbar-dropdown is-right">
              <a href="#" className="navbar-item">
                Profile
              </a>
              <a href="#" className="navbar-item">
                Settings
              </a>
              <hr className="navbar-divider" />
              <a href="#" className="navbar-item" onClick={onLogOutClick}>
                <Icono
                  icon={faRightFromBracket}
                  text="Cerrar Sesión"
                  color="has-text-danger"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
