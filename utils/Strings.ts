export function getInitials(varchar: string): string {
  return varchar
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase())
    .join("");
}

export function isActive(
  pathName: string,
  path: string,
  isNavbar: boolean
): string {
  const className = isNavbar
    ? "link-active"
    : "has-background-primary has-text-weight-bold is-active";
  return pathName === path ? className : "";
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
