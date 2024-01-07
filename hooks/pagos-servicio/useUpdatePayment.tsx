import { useState } from "react";
import { IAddServicePayment } from "@/interfaces/pagos-servicio/IAddPayment";
import { ServicePaymentService } from "@/services/front/ServicePaymentService";
import { getErrorMessage } from "@/utils/Errors";

const useUpdatePayment = () => {
  const [loadingUpdatePayment, setLoadingUpdatePayment] =
    useState<boolean>(false);
  const [statusUpdatePayment, setStatusUpdatePayment] = useState<string | null>(
    null
  );

  const handleUpdatePayment = (data: IAddServicePayment) => {
    setLoadingUpdatePayment(true);
    ServicePaymentService.UpdateServicePayment(data)
      .then(() => {
        setStatusUpdatePayment("ok");
      })
      .catch((error) => {
        console.error("error", error);
        setStatusUpdatePayment(getErrorMessage(error));
      })
      .finally(() => setLoadingUpdatePayment(false));
  };

  return { loadingUpdatePayment, handleUpdatePayment, statusUpdatePayment };
};

export default useUpdatePayment;
