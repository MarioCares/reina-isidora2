import {
  faBolt,
  faCashRegister,
  faDollar,
  faDroplet,
  faMoneyCheck,
  faPeopleArrows,
  faTrashCan,
  faWrench,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";

export const IconsByString: { [key: string]: IconDefinition } = {
  CGE: faBolt,
  AGUAALTIPLANO: faDroplet,
  PAGO: faDollar,
  RETIROBASURA: faTrashCan,
  MANTENCION: faWrench,
  CAJACHICA: faCashRegister,
  SEGURO: faMoneyCheck,
  REMUNERACIONES: faPeopleArrows,
};
