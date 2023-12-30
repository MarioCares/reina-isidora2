export const months: { [key: number]: string } = {
  1: "Enero",
  2: "Febrero",
  3: "Marzo",
  4: "Abril",
  5: "Mayo",
  6: "Junio",
  7: "Julio",
  8: "Agosto",
  9: "Septiembre",
  10: "Octubre",
  11: "Noviembre",
  12: "Diciembre",
};

export const serviceTypes: { [key: string]: string } = {
  AGUAALTIPLANO: "Aguas del Altiplano",
  CGE: "CGE",
  PAGO: "Otros Pagos",
};

export const bankAccountTypes: { [key: string]: string } = {
  CTACTE: "Cuenta Corriente",
  CTAVISTA: "Cuenta Vista",
  CTARUT: "Cuenta RUT",
  OTRO: "Otra",
};

export function getInitials(varchar: string): string {
  return varchar
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase())
    .join("");
}

export function isActive(
  pathName: string,
  availablePaths: string[],
  isNavbar: boolean
): string {
  const className = isNavbar
    ? "link-active"
    : "has-background-primary has-text-weight-bold is-active";
  if (availablePaths.some((url) => url.includes("*"))) {
    // ignore last part
    return availablePaths.includes(
      `${pathName.slice(0, pathName.lastIndexOf("/") + 1)}*`
    )
      ? className
      : "";
  }
  return availablePaths.includes(pathName) ? className : "";
}

export function dateTimeToDateEs(datetime: Date | null): string {
  if (datetime === null) return "";
  const [date] = datetime.toString().split("T");
  const [year, month, day] = date.split("-");
  return `${day}-${month}-${year}`;
}

export function dateTimeToDateEn(datetime: Date | null): string {
  if (datetime === null) return "";
  const [date] = datetime.toString().split("T");
  return date;
}
