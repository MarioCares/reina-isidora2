import { IApartment } from "@/interfaces/IApartment";
import { Client, ClientData } from "@/utils/Client";

const AddApartment = (data: IApartment) =>
  Client("/api/apartment", {
    method: "POST",
    body: data,
    headers: {},
  });

const UpdateApartment = (data: IApartment) =>
  Client(`/api/apartment/${data.id}`, {
    method: "PUT",
    body: data,
    headers: {},
  });

const GetApartments = () => ClientData("/api/apartment/");

const GetApartment = (id: number) => ClientData(`/api/apartment/${id}`);

export const ApartmentService = {
  AddApartment,
  UpdateApartment,
  GetApartments,
  GetApartment,
};
