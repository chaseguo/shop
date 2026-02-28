"use client";

import ReactECharts from "echarts-for-react";

interface BrandBarProps {
  data: { name: string; value: number; color: string }[];
  height?: number;
}

export default function BrandBar({ data, height = 220 }: BrandBarProps) {
  const option = {
    backgroundColor: "transparent",
    grid: { left: 80, right: 20, top: 10, bottom: 20 },
    xAxis: {
      type: "value",
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: "#6b7280", fontSize: 10 },
      splitLine: { lineStyle: { color: "#1f2937" } },
    },
    yAxis: {
      type: "category",
      data: data.map((d) => d.name),
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: "#d1d5db", fontSize: 12 },
    },
    series: [
      {
        type: "bar",
        data: data.map((d) => ({
          value: d.value,
          itemStyle: { color: d.color, borderRadius: [0, 4, 4, 0] },
        })),
        barMaxWidth: 20,
        label: {
          show: true,
          position: "right",
          formatter: "{c}%",
          color: "#9ca3af",
          fontSize: 11,
        },
      },
    ],
  };

  return <ReactECharts option={option} style={{ height: `${height}px` }} />;
}
