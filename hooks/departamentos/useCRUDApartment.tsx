import { useState } from "react";
import { IApartment } from "@/interfaces/IApartment";
import { ApartmentService } from "@/services/front/ApartmentService";
import { getErrorMessage } from "@/utils/Errors";
import { Apartment } from "@prisma/client";

const useCRUDApartment = () => {
  const [loadingApartment, setLoadingApartment] = useState<boolean>(false);
  const [statusAparment, setStatusAparment] = useState<string | null>(null);
  const [apartments, setApartments] = useState<Apartment[]>([]);

  const handleAddApartment = (data: IApartment) => {
    setLoadingApartment(true);
    ApartmentService.AddApartment(data)
      .then(() => setStatusAparment("ok"))
      .catch((error) => {
        console.error("error", error);
        setStatusAparment(getErrorMessage(error));
      })
      .finally(() => setLoadingApartment(false));
  };

  const handleUpdateApartment = (data: IApartment) => {
    setLoadingApartment(true);
    ApartmentService.UpdateApartment(data)
      .then(() => setStatusAparment("ok"))
      .catch((error) => {
        console.error("error", error);
        setStatusAparment(getErrorMessage(error));
      })
      .finally(() => setLoadingApartment(false));
  };

  const handleGetApartments = () => {
    setLoadingApartment(true);
    ApartmentService.GetApartments()
      .then((data) => setApartments(data))
      .catch((error) => {
        console.error("error", error);
        setStatusAparment(getErrorMessage(error));
      })
      .finally(() => setLoadingApartment(false));
  };

  const handleGetApartment = (id: number) => {
    setLoadingApartment(true);
    ApartmentService.GetApartment(id)
      .then((data) => setApartments(data))
      .catch((error) => {
        console.error("error", error);
        setStatusAparment(getErrorMessage(error));
      })
      .finally(() => setLoadingApartment(false));
  };

  return {
    apartments,
    loadingApartment,
    handleGetApartments,
    handleGetApartment,
    handleUpdateApartment,
    handleAddApartment,
    statusAparment,
  };
};

export default useCRUDApartment;
