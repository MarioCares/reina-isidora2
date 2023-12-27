"use client";

import ReactEcharts from "echarts-for-react";
import React from "react";

export function ServicePaymentChart({ option }: { option: any }) {
  return <ReactEcharts className="box" option={option} />;
}
