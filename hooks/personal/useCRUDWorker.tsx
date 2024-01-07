import { useState } from "react";
import { WorkerService } from "@/services/front/WorkerService";
import { getErrorMessage } from "@/utils/Errors";
import { IWorker } from "@/interfaces/personal/IAddWorker";

const useCRUDWorker = () => {
  const [loadingWorker, setLoadingWorker] = useState<boolean>(false);
  const [statusWorker, setStatusWorker] = useState<string | null>(null);

  const handleAddWorker = (data: IWorker) => {
    setLoadingWorker(true);
    WorkerService.AddWorker(data)
      .then(() => setStatusWorker("ok"))
      .catch((error) => {
        console.error("error", error);
        setStatusWorker(getErrorMessage(error));
      })
      .finally(() => setLoadingWorker(false));
  };

  const handleUpdateWorker = (data: IWorker) => {
    setLoadingWorker(true);
    WorkerService.UpdateWorker(data)
      .then(() => setStatusWorker("ok"))
      .catch((error) => {
        console.error("error", error);
        setStatusWorker(getErrorMessage(error));
      })
      .finally(() => setLoadingWorker(false));
  };

  return { loadingWorker, handleAddWorker, handleUpdateWorker, statusWorker };
};

export default useCRUDWorker;
