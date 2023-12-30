import { Metadata } from "next";
import React from "react";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/ui/sidebar/Sidebar";
import { UiContextProvider } from "@/context/UiContext";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getInitials } from "@/utils/Strings";

export const metadata: Metadata = {
  title: "Autenticación - Comunidad Reina Isidora",
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  const role = `${session?.user?.role}`;
  const initials = getInitials(`${session?.user?.name}`);
  return (
    <div className="pt-6">
      <UiContextProvider>
        <Navbar initials={initials} />
        <div className="columns is-variable is-0">
          <Sidebar role={role} />
          <div className="column is-10-desktop is-offset-2-desktop is-9-tablet is-offset-3-tablet is-12-mobile pl-3">
            {children}
          </div>
        </div>
      </UiContextProvider>
    </div>
  );
}
