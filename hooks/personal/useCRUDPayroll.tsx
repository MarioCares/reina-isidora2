import { useState } from "react";
import { IHeaderPayroll } from "@/interfaces/personal/IPayroll";
import { PayrollService } from "@/services/front/PayrollService";
import { getErrorMessage } from "@/utils/Errors";

const useCRUDPayroll = () => {
  const [loadingPayroll, setLoadingPayroll] = useState<boolean>(false);
  const [statusPayroll, setStatusPayroll] = useState<string | null>(null);

  const handleAddHeader = (data: IHeaderPayroll) => {
    setLoadingPayroll(true);
    PayrollService.AddHeaderPayroll(data)
      .then(() => setStatusPayroll("ok"))
      .catch((error) => {
        console.error("error", error);
        setStatusPayroll(getErrorMessage(error));
      })
      .finally(() => setLoadingPayroll(false));
  };

  const handleUpdateHeader = (data: IHeaderPayroll) => {
    setLoadingPayroll(true);
    PayrollService.UpdateHeaderPayroll(data)
      .then(() => setStatusPayroll("ok"))
      .catch((error) => {
        console.error("error", error);
        setStatusPayroll(getErrorMessage(error));
      })
      .finally(() => setLoadingPayroll(false));
  };
  return { loadingPayroll, handleAddHeader, handleUpdateHeader, statusPayroll };
};

export default useCRUDPayroll;
