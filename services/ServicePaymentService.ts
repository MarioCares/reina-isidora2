import { IAddServicePayment } from "@/interfaces/pagos-servicio/IAddPayment";
import { Client } from "@/utils/Client";

const AddServicePayment = (data: IAddServicePayment) =>
  Client("/api/service-payment/", {
    method: "POST",
    body: data,
    headers: {},
  });

const UpdateServicePayment = (data: IAddServicePayment) =>
  Client(`/api/service-payment/${data.id}`, {
    method: "PUT",
    body: data,
    headers: {},
  });

export const ServicePaymentService = {
  AddServicePayment,
  UpdateServicePayment,
};
