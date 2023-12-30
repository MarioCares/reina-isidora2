import { Client } from "@/utils/Client";
import { IWorker } from "@/interfaces/personal/IAddWorker";

const AddWorker = (data: IWorker) =>
  Client("/api/worker/", {
    method: "POST",
    body: data,
    headers: {},
  });

const UpdateWorker = (data: IWorker) =>
  Client(`/api/worker/${data.id}`, {
    method: "PUT",
    body: data,
    headers: {},
  });

const DeleteWorker = (workerId: number) =>
  Client(`/api/worker/${workerId}`, {
    method: "DELETE",
    body: {},
    headers: {},
  });

export const WorkerService = {
  AddWorker,
  UpdateWorker,
  DeleteWorker,
};
