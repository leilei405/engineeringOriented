"use client";
import { Button, Tooltip } from "antd";
import {
  FontSizeOutlined,
  FileTextOutlined,
  PictureOutlined,
  DashboardOutlined,
  TableOutlined,
  BarChartOutlined,
} from "@ant-design/icons";
import type { ComponentType } from "../lib/types";
import styles from "../styles/toolbar.module.scss";

interface ToolbarProps {
  onAddComponent: (type: ComponentType) => void;
}

export default function Toolbar({ onAddComponent }: ToolbarProps) {
  const tools = [
    {
      type: "label" as ComponentType,
      icon: <FontSizeOutlined />,
      label: "标签",
    },
    {
      type: "text" as ComponentType,
      icon: <FileTextOutlined />,
      label: "文本框",
    },
    {
      type: "image" as ComponentType,
      icon: <PictureOutlined />,
      label: "图片",
    },
    {
      type: "indicator" as ComponentType,
      icon: <DashboardOutlined />,
      label: "指标",
    },
    { type: "table" as ComponentType, icon: <TableOutlined />, label: "表格" },
    {
      type: "echarts" as ComponentType,
      icon: <BarChartOutlined />,
      label: "图表",
    },
  ];

  return (
    <div className={styles.toolbar}>
      {tools.map((tool) => (
        <Tooltip key={tool.type} title={tool.label} placement="bottom">
          <Button
            type="text"
            className={styles.toolButton}
            icon={tool.icon}
            onClick={() => onAddComponent(tool.type)}
          >
            {tool.label}
          </Button>
        </Tooltip>
      ))}
    </div>
  );
}
