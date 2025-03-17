"use client";

import type React from "react";
import { useEffect, useRef } from "react";
import type { CanvasElement } from "../../types";
import * as echarts from "echarts";

interface ChartElementProps {
  element: CanvasElement;
}

const ChartElement: React.FC<ChartElementProps> = ({ element }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);
  const { properties } = element;
  const {
    chartType = "bar",
    chartName = "未选择图表",
    fontSize = 14,
    fontColor = "#000000",
    titleFontSize = 16,
    titleFontColor = "#000000",
    backgroundColor = "#ffffff",
    borderColor = "#e8e8e8",
    borderWidth = 1,
    borderStyle = "solid",
    data = [
      { month: "2024-01", value: 120 },
      { month: "2024-02", value: 100 },
      { month: "2024-03", value: 125 },
      { month: "2024-04", value: 123 },
      { month: "2024-05", value: 127 },
      { month: "2024-06", value: 130 },
      { month: "2024-07", value: 135 },
      { month: "2024-08", value: 140 },
      { month: "2024-09", value: 145 },
      { month: "2024-10", value: 150 },
      { month: "2024-11", value: 155 },
      { month: "2024-12", value: 160 },
    ],
  } = properties;

  useEffect(() => {
    if (chartRef.current) {
      if (!chartInstance.current) {
        chartInstance.current = echarts.init(chartRef.current);
      }

      // 根据图表类型设置不同的配置
      let option;

      if (chartType === "bar") {
        option = {
          title: {
            text: chartName,
            left: "center",
            textStyle: {
              fontSize: titleFontSize,
              color: titleFontColor,
            },
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow",
            },
          },
          textStyle: {
            fontSize: fontSize,
            color: fontColor,
          },
          xAxis: {
            type: "category",
            data: data.map((item: any) => item.month),
          },
          yAxis: {
            type: "value",
          },
          series: [
            {
              data: data.map((item: any) => item.value),
              type: "bar",
              itemStyle: {
                color: "#1890ff",
              },
            },
          ],
        };
      } else if (chartType === "line") {
        option = {
          title: {
            text: chartName,
            left: "center",
            textStyle: {
              fontSize: titleFontSize,
              color: titleFontColor,
            },
          },
          tooltip: {
            trigger: "axis",
          },
          textStyle: {
            fontSize: fontSize,
            color: fontColor,
          },
          xAxis: {
            type: "category",
            data: data.map((item: any) => item.month),
          },
          yAxis: {
            type: "value",
          },
          series: [
            {
              data: data.map((item: any) => item.value),
              type: "line",
              smooth: true,
              itemStyle: {
                color: "#1890ff",
              },
            },
          ],
        };
      } else if (chartType === "pie") {
        option = {
          title: {
            text: chartName,
            left: "center",
            textStyle: {
              fontSize: titleFontSize,
              color: titleFontColor,
            },
          },
          tooltip: {
            trigger: "item",
          },
          textStyle: {
            fontSize: fontSize,
            color: fontColor,
          },
          legend: {
            orient: "horizontal",
            bottom: "bottom",
          },
          series: [
            {
              type: "pie",
              radius: "70%",
              data: data.map((item: any) => ({
                value: item.value,
                name: item.month,
              })),
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)",
                },
              },
            },
          ],
        };
      }

      if (option) {
        chartInstance.current.setOption(option);
      }

      // 监听容器大小变化，调整图表大小
      const resizeObserver = new ResizeObserver(() => {
        chartInstance.current?.resize();
      });

      resizeObserver.observe(chartRef.current);

      return () => {
        resizeObserver.disconnect();
        chartInstance.current?.dispose();
        chartInstance.current = null;
      };
    }
  }, [
    element.size.width,
    element.size.height,
    chartType,
    chartName,
    fontSize,
    fontColor,
    titleFontSize,
    titleFontColor,
    data,
  ]);

  return (
    <div
      className="chart-element"
      style={{
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        backgroundColor,
        border:
          borderWidth > 0
            ? `${borderWidth}px ${borderStyle} ${borderColor}`
            : "none",
      }}
    >
      <div ref={chartRef} style={{ width: "100%", height: "100%" }}></div>
    </div>
  );
};

export default ChartElement;
