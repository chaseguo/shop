"use client";

import ReactECharts from "echarts-for-react";

interface LRCIGaugeProps {
  value: number;
}

export default function LRCIGauge({ value }: LRCIGaugeProps) {
  const option = {
    backgroundColor: "transparent",
    series: [
      {
        type: "gauge",
        startAngle: 200,
        endAngle: -20,
        min: 0,
        max: 100,
        radius: "90%",
        center: ["50%", "60%"],
        axisLine: {
          lineStyle: {
            width: 14,
            color: [
              [0.3, "#ef4444"],
              [0.6, "#f59e0b"],
              [0.8, "#3b82f6"],
              [1, "#10b981"],
            ],
          },
        },
        pointer: {
          icon: "path://M12.8,0.7l12,40.1H0.7L12.8,0.7z",
          length: "55%",
          width: 10,
          itemStyle: { color: "#ffffff" },
        },
        axisTick: { show: false },
        splitLine: { show: false },
        axisLabel: { show: false },
        detail: {
          valueAnimation: true,
          formatter: "{value}",
          color: "#ffffff",
          fontSize: 28,
          fontWeight: "bold",
          offsetCenter: [0, "15%"],
        },
        title: {
          color: "#6b7280",
          fontSize: 12,
          offsetCenter: [0, "40%"],
        },
        data: [{ value, name: "LRCI" }],
      },
    ],
  };

  return <ReactECharts option={option} style={{ height: "200px" }} />;
}
