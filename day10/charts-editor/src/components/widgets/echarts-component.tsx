"use client";

import { useRef, useEffect } from "react";
import * as echarts from "echarts";
import type { ComponentData } from "../../lib/types";
import styles from "../../styles/widgets/echarts-component.module.scss";

interface EChartsComponentProps {
  component: ComponentData;
}

export default function EChartsComponent({ component }: EChartsComponentProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // 如果已经有实例，先销毁
    if (chartInstance.current) {
      chartInstance.current.dispose();
    }

    const chart = echarts.init(chartRef.current);
    chartInstance.current = chart;

    // 如果有自定义配置，使用自定义配置
    if (component.data?.chartOptions) {
      chart.setOption(component.data.chartOptions);
    } else {
      // 否则使用默认图表
      const chartType = component.data?.chartType || "bar";
      let options;

      switch (chartType) {
        case "pie":
          options = getPieChartOptions();
          break;
        case "line":
          options = getLineChartOptions();
          break;
        case "bar":
        default:
          options = getBarChartOptions();
          break;
      }

      chart.setOption(options);
    }

    const handleResize = () => {
      chart.resize();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.dispose();
      chartInstance.current = null;
    };
  }, [component]);

  return <div ref={chartRef} className={styles.echartsComponent} />;
}

function getBarChartOptions() {
  return {
    title: {
      text: "本年度总碳排放",
      left: "center",
    },
    tooltip: {
      trigger: "axis",
    },
    xAxis: {
      type: "category",
      data: ["1月", "2月", "3月", "4月", "5月", "6月"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110],
        type: "bar",
      },
    ],
  };
}

function getLineChartOptions() {
  return {
    title: {
      text: "碳排放与用能分析",
      left: "center",
    },
    tooltip: {
      trigger: "axis",
    },
    xAxis: {
      type: "category",
      data: ["1月", "2月", "3月", "4月", "5月", "6月"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "碳排放",
        data: [150, 230, 224, 218, 135, 147],
        type: "line",
        smooth: true,
      },
      {
        name: "用能",
        data: [220, 182, 191, 234, 290, 330],
        type: "line",
        smooth: true,
      },
    ],
  };
}

function getPieChartOptions() {
  return {
    title: {
      text: "地市基站碳排放",
      left: "center",
    },
    tooltip: {
      trigger: "item",
    },
    series: [
      {
        name: "碳排放占比",
        type: "pie",
        radius: "70%",
        data: [
          { value: 335, name: "城市A" },
          { value: 310, name: "城市B" },
          { value: 234, name: "城市C" },
          { value: 135, name: "城市D" },
          { value: 1548, name: "城市E" },
        ],
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
