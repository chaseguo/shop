"use client";

import ReactECharts from "echarts-for-react";

interface TrendLineProps {
  title?: string;
  data: { date: string; value: number }[];
  color?: string;
  height?: number;
}

// Accept either hex color or Tailwind color name
const resolveColor = (c: string) => {
  const map: Record<string, string> = {
    "blue-500": "#3b82f6", "emerald-500": "#10b981",
    "red-500": "#ef4444",  "violet-500": "#8b5cf6",
    "amber-500": "#f59e0b","cyan-500": "#06b6d4",
  };
  return map[c] ?? (c.startsWith("#") ? c : "#3b82f6");
};

export default function TrendLine({ data, color = "#3b82f6", height = 120 }: TrendLineProps) {
  color = resolveColor(color);
  const option = {
    backgroundColor: "transparent",
    grid: { left: 8, right: 8, top: 8, bottom: 8 },
    xAxis: {
      type: "category",
      data: data.map((d) => d.date),
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { show: false },
    },
    yAxis: {
      type: "value",
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { show: false },
      splitLine: { show: false },
    },
    series: [
      {
        type: "line",
        data: data.map((d) => d.value),
        smooth: true,
        symbol: "none",
        lineStyle: { color, width: 2 },
        areaStyle: {
          color: {
            type: "linear",
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: color + "40" },
              { offset: 1, color: color + "05" },
            ],
          },
        },
      },
    ],
  };

  return <ReactECharts option={option} style={{ height: `${height}px` }} />;
}
