"use client";

import type React from "react";
import { List, Button, Tooltip } from "antd";
import {
  EyeOutlined,
  EyeInvisibleOutlined,
  DeleteOutlined,
  FontSizeOutlined,
  FileTextOutlined,
  PictureOutlined,
  DashboardOutlined,
  TableOutlined,
  AreaChartOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import type { CanvasElement, ElementType } from "../types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import "../styles/LayerPanel.scss";

interface LayerItemProps {
  element: CanvasElement;
  isSelected: boolean;
  onSelect: (element: CanvasElement) => void;
  onToggleVisibility: (id: string) => void;
  onDelete: (id: string) => void;
}

const getElementIcon = (type: ElementType) => {
  switch (type) {
    case "label":
      return <FontSizeOutlined />;
    case "text":
      return <FileTextOutlined />;
    case "image":
      return <PictureOutlined />;
    case "indicator":
      return <DashboardOutlined />;
    case "table":
      return <TableOutlined />;
    case "chart":
      return <AreaChartOutlined />;
    default:
      return <ThunderboltOutlined />;
  }
};

const getElementTypeName = (type: ElementType): string => {
  const typeMap: Record<ElementType, string> = {
    label: "标签",
    text: "文本框",
    image: "图片",
    indicator: "指标",
    table: "表格",
    chart: "图表",
  };
  return typeMap[type] || "未知元素";
};

// 修改 LayerItem 组件，确保点击事件正确触发
const LayerItem: React.FC<LayerItemProps> = ({
  element,
  isSelected,
  onSelect,
  onToggleVisibility,
  onDelete,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: element.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`layer-item ${isSelected ? "selected" : ""}`}
      onClick={() => onSelect(element)}
    >
      <div className="layer-item-content">
        <div className="layer-item-icon">{getElementIcon(element.type)}</div>
        <div className="layer-item-name">
          {getElementTypeName(element.type)}
          {element.type === "label" && element.content
            ? `: ${element.content}`
            : ""}
          {element.type === "indicator" && element.properties.indicatorName
            ? `: ${element.properties.indicatorName}`
            : ""}
          {element.type === "table" && element.properties.tableName
            ? `: ${element.properties.tableName}`
            : ""}
          {element.type === "chart" && element.properties.chartName
            ? `: ${element.properties.chartName}`
            : ""}
        </div>
        <div className="layer-item-actions">
          <Tooltip title={element.visible ? "隐藏" : "显示"}>
            <Button
              type="text"
              size="small"
              icon={
                element.visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
              }
              onClick={(e) => {
                e.stopPropagation();
                onToggleVisibility(element.id);
              }}
            />
          </Tooltip>
          <Tooltip title="删除">
            <Button
              type="text"
              size="small"
              danger
              icon={<DeleteOutlined />}
              onClick={(e) => {
                e.stopPropagation();
                onDelete(element.id);
              }}
            />
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

interface LayerPanelProps {
  elements: CanvasElement[];
  selectedElementId?: string;
  onSelectElement: (element: CanvasElement) => void;
  onToggleVisibility: (id: string) => void;
  onDeleteElement: (id: string) => void;
}

const LayerPanel: React.FC<LayerPanelProps> = ({
  elements,
  selectedElementId,
  onSelectElement,
  onToggleVisibility,
  onDeleteElement,
}) => {
  // 按照zIndex降序排列，使得列表中的顺序与画布中的视觉层级一致
  const sortedElements = [...elements].sort((a, b) => b.zIndex - a.zIndex);

  return (
    <div className="layer-panel">
      <div className="layer-panel-header">
        <h3>图层</h3>
      </div>
      <div className="layer-panel-content">
        <SortableContext
          items={sortedElements.map((el) => el.id)}
          strategy={verticalListSortingStrategy}
        >
          {sortedElements.length > 0 ? (
            <List
              dataSource={sortedElements}
              renderItem={(element) => (
                <LayerItem
                  key={element.id}
                  element={element}
                  isSelected={element.id === selectedElementId}
                  onSelect={onSelectElement}
                  onToggleVisibility={onToggleVisibility}
                  onDelete={onDeleteElement}
                />
              )}
            />
          ) : (
            <div className="empty-layer-panel">
              <p>暂无图层，请从工具栏添加元素</p>
            </div>
          )}
        </SortableContext>
      </div>
    </div>
  );
};

export default LayerPanel;
