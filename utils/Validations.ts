import { ServicePaymentType } from ".prisma/client";

export function checkInEnum(value: string): boolean {
  const servicePaymentTypes = Object.values(ServicePaymentType);
  return servicePaymentTypes.includes(value as ServicePaymentType);
}
