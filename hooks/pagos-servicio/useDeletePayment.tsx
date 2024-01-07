import { useState } from "react";
import { ServicePaymentService } from "@/services/front/ServicePaymentService";
import { getErrorMessage } from "@/utils/Errors";

const useDeletePayment = () => {
  const [loadingDeletePayment, setLoadingDeletePayment] =
    useState<boolean>(false);
  const [statusDeletePayment, setStatusDeletePayment] = useState<string | null>(
    null
  );

  const handleDeletePayment = (paymentId: number) => {
    setLoadingDeletePayment(true);
    ServicePaymentService.DeleteServicePayment(paymentId)
      .then(() => {
        setStatusDeletePayment("ok");
      })
      .catch((error) => {
        console.error("error", error);
        setStatusDeletePayment(getErrorMessage(error));
      })
      .finally(() => setLoadingDeletePayment(false));
  };

  return { loadingDeletePayment, handleDeletePayment, statusDeletePayment };
};

export default useDeletePayment;
