"use client";

import ReactECharts from "echarts-for-react";

export default function TopicBubble({ height = 260 }: { height?: number }) {
  const option = {
    backgroundColor: "transparent",
    grid: { left: 50, right: 20, top: 20, bottom: 40 },
    xAxis: {
      type: "value",
      name: "影响分",
      nameTextStyle: { color: "#6b7280", fontSize: 10 },
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: "#6b7280", fontSize: 10 },
      splitLine: { lineStyle: { color: "#1f2937" } },
    },
    yAxis: {
      type: "value",
      name: "提及次数",
      nameTextStyle: { color: "#6b7280", fontSize: 10 },
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: "#6b7280", fontSize: 10 },
      splitLine: { lineStyle: { color: "#1f2937" } },
    },
    series: [
      {
        type: "scatter",
        data: [
          { value: [87, 42, 60], name: "资费不清", itemStyle: { color: "#ef4444" } },
          { value: [72, 35, 45], name: "利率误解", itemStyle: { color: "#f59e0b" } },
          { value: [65, 28, 35], name: "审批误读", itemStyle: { color: "#8b5cf6" } },
          { value: [45, 18, 25], name: "品牌混淆", itemStyle: { color: "#3b82f6" } },
          { value: [30, 12, 15], name: "其他", itemStyle: { color: "#6b7280" } },
        ],
        symbolSize: (data: number[]) => data[2],
        label: {
          show: true,
          formatter: (params: { data: { name: string } }) => params.data.name,
          color: "#d1d5db",
          fontSize: 10,
          position: "top",
        },
        emphasis: {
          focus: "self",
          label: { show: true, fontSize: 12, fontWeight: "bold" },
        },
      },
    ],
  };

  return <ReactECharts option={option} style={{ height: `${height}px` }} />;
}
