import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import IncompleteData from "@/components/user/incompleteData";
import DashBoard from "@/components/inicio/DashBoard";

// const getGroupedByTypeServicePayments = async (
//   date: string | undefined
// ): Promise<IGroupedByTypeServicePayment[]> => {
//   const today = new Date();
//   const year = today.getFullYear();
//   const month = (today.getMonth() + 1).toString().padStart(2, "0");
//   const dateSearch = date ?? `${year}-${month}`;
//   const data = await fetch(
//     `http://localhost:3000/api/service-payment?grouped=1&yearMonth=${dateSearch}`,
//     {
//       next: {
//         revalidate: 0,
//       },
//     }
//   );
//   return await data.json();
// };

interface LandingPageProps {
  searchParams: { [key: string]: string | undefined };
}

export default async function LandingPage({ searchParams }: LandingPageProps) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }

  return (
    <div className="p-3">
      <div className="columns is-variable is-desktop">
        <div className="column">
          <h1 className="title is-2">Escritorio</h1>
        </div>
      </div>
      <hr />
      {session.user?.apartmentId === null && session.user?.role !== "ADMIN" ? (
        <IncompleteData />
      ) : (
        <DashBoard />
      )}
    </div>
  );
}
