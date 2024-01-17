"use client";

import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useUiContext } from "@/context/UiContext";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import Icono from "@/components/ui/Icono";
import React from "react";

export function Navbar({ initials }: { initials: string }) {
  const pathName = usePathname();

  const {
    isNavbarVisible,
    isSideBarVisible,
    isPageLoaderVisible,
    setIsNavbarVisible,
    setIsSideBarVisible,
  } = useUiContext();

  const onLogOutClick = () => {
    signOut();
  };

  return (
    <>
      <div className={`pageloader ${isPageLoaderVisible && "is-active"}`}>
        <span className="title">Cargando...</span>
      </div>

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

          <a
            href="/"
            className="navbar-item has-text-weight-bold has-text-black"
          >
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
          <div className="navbar-start"></div>
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
    </>
  );
}
