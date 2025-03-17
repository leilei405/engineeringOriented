"use client";

import type React from "react";
import { Button, Space, Tooltip } from "antd";
import {
  FontSizeOutlined,
  FileTextOutlined,
  PictureOutlined,
  DashboardOutlined,
  TableOutlined,
  AreaChartOutlined,
  SaveOutlined,
  EyeOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
import type { ElementType } from "../types";
import "../styles/ToolBar.scss";

interface ToolBarProps {
  onAddElement: (type: ElementType) => void;
  onSave: () => void;
  onPreview: () => void;
  onToggleLayerPanel: () => void;
  layerPanelVisible: boolean;
}

const ToolBar: React.FC<ToolBarProps> = ({
  onAddElement,
  onSave,
  onPreview,
  onToggleLayerPanel,
  layerPanelVisible,
}) => {
  const tools = [
    { type: "label" as ElementType, icon: <FontSizeOutlined />, title: "标签" },
    {
      type: "text" as ElementType,
      icon: <FileTextOutlined />,
      title: "文本框",
    },
    { type: "image" as ElementType, icon: <PictureOutlined />, title: "图片" },
    {
      type: "indicator" as ElementType,
      icon: <DashboardOutlined />,
      title: "指标",
    },
    { type: "table" as ElementType, icon: <TableOutlined />, title: "表格" },
    {
      type: "chart" as ElementType,
      icon: <AreaChartOutlined />,
      title: "图表",
    },
  ];

  return (
    <div className="toolbar">
      <div className="toolbar-left">
        <Button
          type="primary"
          icon={
            layerPanelVisible ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />
          }
          onClick={onToggleLayerPanel}
          className="toggle-layer-btn"
        />
        <div className="toolbar-tools">
          {tools.map((tool) => (
            <Tooltip key={tool.type} title={tool.title} placement="bottom">
              <div
                className="toolbar-item"
                onClick={() => onAddElement(tool.type)}
              >
                <Space>
                  {tool.icon}
                  <span>{tool.title}</span>
                </Space>
              </div>
            </Tooltip>
          ))}
        </div>
      </div>
      <div className="toolbar-right">
        <Button
          type="primary"
          icon={<SaveOutlined />}
          onClick={onSave}
          className="action-button"
        >
          保存
        </Button>
        <Button
          type="primary"
          icon={<EyeOutlined />}
          onClick={onPreview}
          className="action-button"
        >
          预览
        </Button>
      </div>
    </div>
  );
};

export default ToolBar;
