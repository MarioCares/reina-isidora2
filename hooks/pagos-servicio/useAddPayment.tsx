import { useState } from "react";
import { IAddServicePayment } from "@/interfaces/pagos-servicio/IAddPayment";
import { ServicePaymentService } from "@/services/front/ServicePaymentService";
import { getErrorMessage } from "@/utils/Errors";

const useAddServicePayment = () => {
  const [loadingAddPayment, setLoadingAddPayment] = useState<boolean>(false);
  const [statusAddPayment, setStatusAddPayment] = useState<string | null>(null);

  const handleAddPayment = (data: IAddServicePayment) => {
    setLoadingAddPayment(true);
    ServicePaymentService.AddServicePayment(data)
      .then(() => {
        setStatusAddPayment("ok");
      })
      .catch((error) => {
        console.error("error", error);
        setStatusAddPayment(getErrorMessage(error));
      })
      .finally(() => setLoadingAddPayment(false));
  };

  return { loadingAddPayment, handleAddPayment, statusAddPayment };
};

export default useAddServicePayment;
