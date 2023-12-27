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

const DeleteServicePayment = (paymentId: number) =>
  Client(`/api/service-payment/${paymentId}`, {
    method: "DELETE",
    body: {},
    headers: {},
  });

export const ServicePaymentService = {
  AddServicePayment,
  UpdateServicePayment,
  DeleteServicePayment,
};
