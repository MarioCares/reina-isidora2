import { months } from "@/utils/Strings";
import { ServicePaymentType } from ".prisma/client";

export function ServicePaymentToOneBarChart(
  data: { amount: number; month: string }[]
) {
  const xData: string[] = [];
  const seriesData: number[] = [];
  data.forEach((item) => {
    xData.push(months[Number(item.month.split("-")[1])]);
    seriesData.push(item.amount);
  });
  return {
    xData,
    seriesData,
  };
}

export function ServicePaymentToMultipleBarChart(
  data: { amount: number; month: string; serviceType: ServicePaymentType }[]
) {
  const extractedServicePaymentTypes = data
    .map((item) => item.serviceType)
    .filter((value, index, self) => self.indexOf(value) === index);
  // const extractedMonths = data
  //   .map((item) => item.month)
  //   .filter((value, index, self) => self.indexOf(value) === index);

  const resultadoParcial = data.reduce(
    (acumulador: any, { amount, serviceType, month }) => {
      acumulador[month] = acumulador[month] || { month };
      acumulador[month][serviceType] =
        (acumulador[month][serviceType] || 0) + amount;
      return acumulador;
    },
    {}
  );

  const resultadoFinal = Object.values(resultadoParcial).map(
    ({
      month,
      CGE,
      AGUAALTIPLANO,
      PAGO,
      RETIROBASURA,
      MANTENCION,
      CAJACHICA,
      SEGURO,
      REMUNERACIONES,
    }: any) => ({
      month,
      CGE: CGE || 0,
      AGUAALTIPLANO: AGUAALTIPLANO || 0,
      PAGO: PAGO || 0,
      RETIROBASURA: RETIROBASURA || 0,
      MANTENCION: MANTENCION || 0,
      CAJACHICA: CAJACHICA || 0,
      SEGURO: SEGURO || 0,
      REMUNERACIONES: REMUNERACIONES || 0,
    })
  );

  return {
    legend: {},
    tooltip: {},
    dataset: {
      dimensions: ["month", ...extractedServicePaymentTypes],
      source: resultadoFinal,
    },
    xAxis: { type: "category" },
    yAxis: {},
    series: extractedServicePaymentTypes.map(() => ({ type: "bar" })),
  };
}
