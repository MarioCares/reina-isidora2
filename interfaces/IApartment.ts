import { ParkingFloor } from "@prisma/client";

export interface IApartment {
  id?: number;
  number: number;
  prorating: number;
  mts2: number;
  rol: string;
  storageNumber: number;
  storageRol: string;
  parkingNumber: number;
  parkingRol: string;
  parking: ParkingFloor;
  apartmentOwnerResponsableName: string;
  apartmentOwnerResponsablePhoneNumber: string;
  apartmentOwnerResponsableEmail: string;
  emergencyContactName: string;
  emergencyContactPhoneNumber: string;
  emergencyContactEmail: string;
  notes: string;
}
