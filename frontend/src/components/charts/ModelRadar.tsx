"use client";

import ReactECharts from "echarts-for-react";

export default function ModelRadar({ height = 220 }: { height?: number }) {
  const option = {
    backgroundColor: "transparent",
    legend: {
      data: ["度小满", "奇富借条", "洋钱罐"],
      textStyle: { color: "#9ca3af", fontSize: 11 },
      bottom: 0,
    },
    radar: {
      indicator: [
        { name: "推荐率", max: 100 },
        { name: "Top1 占比", max: 100 },
        { name: "正向提及", max: 100 },
        { name: "可信度", max: 100 },
        { name: "场景覆盖", max: 100 },
      ],
      shape: "polygon",
      splitNumber: 4,
      axisName: { color: "#6b7280", fontSize: 10 },
      splitLine: { lineStyle: { color: "#1f2937" } },
      splitArea: { show: false },
      axisLine: { lineStyle: { color: "#1f2937" } },
    },
    series: [
      {
        type: "radar",
        data: [
          { value: [35, 28, 42, 38, 45], name: "度小满", lineStyle: { color: "#3b82f6" }, areaStyle: { color: "rgba(59,130,246,0.15)" }, itemStyle: { color: "#3b82f6" } },
          { value: [72, 65, 68, 72, 60], name: "奇富借条", lineStyle: { color: "#10b981" }, areaStyle: { color: "rgba(16,185,129,0.15)" }, itemStyle: { color: "#10b981" } },
          { value: [55, 48, 60, 55, 52], name: "洋钱罐", lineStyle: { color: "#f59e0b" }, areaStyle: { color: "rgba(245,158,11,0.15)" }, itemStyle: { color: "#f59e0b" } },
        ],
      },
    ],
  };

  return <ReactECharts option={option} style={{ height: `${height}px` }} />;
}
