import { IHeaderPayroll } from "@/interfaces/personal/IPayroll";
import { Client } from "@/utils/Client";

const AddHeaderPayroll = (data: IHeaderPayroll) =>
  Client("/api/payroll/", {
    method: "POST",
    body: data,
    headers: {},
  });

const UpdateHeaderPayroll = (data: IHeaderPayroll) =>
  Client(`/api/payroll/${data.id}`, {
    method: "PUT",
    body: data,
    headers: {},
  });

export const PayrollService = {
  AddHeaderPayroll,
  UpdateHeaderPayroll,
};
