"use client";

import type React from "react";
import { useRef, useState, useEffect } from "react";
import type { CanvasElement } from "../types";
import LabelElement from "./elements/LabelElement";
import TextElement from "./elements/TextElement";
import ImageElement from "./elements/ImageElement";
import IndicatorElement from "./elements/IndicatorElement";
import TableElement from "./elements/TableElement";
import ChartElement from "./elements/ChartElement";
import { DeleteOutlined } from "@ant-design/icons";
import "../styles/CanvasItem.scss";

interface CanvasItemProps {
  element: CanvasElement;
  isSelected: boolean;
  onSelect: () => void;
  onMove: (position: { x: number; y: number }) => void;
  onResize: (size: { width: number; height: number }) => void;
  onDelete: () => void;
}

const CanvasItem: React.FC<CanvasItemProps> = ({
  element,
  isSelected,
  onSelect,
  onMove,
  onResize,
  onDelete,
}) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  });
  const [position, setPosition] = useState(element.position);
  const [size, setSize] = useState(element.size);

  // 当外部元素属性变化时更新内部状态
  useEffect(() => {
    setPosition(element.position);
    setSize(element.size);
  }, [element.position, element.size]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect();

    // 确保点击的是元素本身或其控制区域，而不是内部内容
    if (
      e.currentTarget === e.target ||
      (e.target as HTMLElement).classList.contains("draggable-area")
    ) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });

      // 添加拖拽时的鼠标样式
      document.body.style.cursor = "move";

      // 防止文本选择等默认行为
      e.preventDefault();
    }
  };

  const handleResizeStart = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setIsResizing(true);
    setResizeStart({
      width: size.width,
      height: size.height,
      x: e.clientX,
      y: e.clientY,
    });

    // 添加调整大小时的鼠标样式
    document.body.style.cursor = "se-resize";
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      const newPosition = {
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      };

      // 更新内部状态以实现平滑拖拽
      setPosition(newPosition);

      // 防止拖出画布边界
      if (newPosition.x < 0) newPosition.x = 0;
      if (newPosition.y < 0) newPosition.y = 0;

      // 实时更新位置
      onMove(newPosition);
    } else if (isResizing) {
      const deltaWidth = e.clientX - resizeStart.x;
      const deltaHeight = e.clientY - resizeStart.y;

      const newSize = {
        width: Math.max(50, resizeStart.width + deltaWidth),
        height: Math.max(50, resizeStart.height + deltaHeight),
      };

      // 更新内部状态以实现平滑调整大小
      setSize(newSize);

      // 实时更新大小
      onResize(newSize);
    }
  };

  const handleMouseUp = () => {
    if (isDragging) {
      // 拖拽结束时，确保最终位置被更新
      onMove(position);
      setIsDragging(false);
    }

    if (isResizing) {
      // 调整大小结束时，确保最终大小被更新
      onResize(size);
      setIsResizing(false);
    }

    // 恢复默认鼠标样式
    document.body.style.cursor = "default";
  };

  useEffect(() => {
    if (isDragging || isResizing) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, isResizing, dragStart, resizeStart, position, size]);

  const renderElementContent = () => {
    switch (element.type) {
      case "label":
        return <LabelElement element={element} />;
      case "text":
        return <TextElement element={element} />;
      case "image":
        return <ImageElement element={element} />;
      case "indicator":
        return <IndicatorElement element={element} />;
      case "table":
        return <TableElement element={element} />;
      case "chart":
        return <ChartElement element={element} />;
      default:
        return <div>未知元素类型</div>;
    }
  };

  return (
    <div
      ref={itemRef}
      className={`canvas-item ${isSelected ? "selected" : ""} ${
        isDragging ? "dragging" : ""
      }`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${size.width}px`,
        height: `${size.height}px`,
        zIndex: element.zIndex,
      }}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
      onMouseDown={handleMouseDown}
    >
      <div className="draggable-area"></div>
      <div className="element-content">{renderElementContent()}</div>

      {isSelected && (
        <>
          <div className="resize-handle" onMouseDown={handleResizeStart}></div>
          <div className="element-type-badge">{element.type}</div>
          <div className="element-controls">
            <div className="position-indicator">
              {position.x}, {position.y}
            </div>
            <div className="size-indicator">
              {size.width} × {size.height}
            </div>
            <div className="delete-button" onClick={onDelete}>
              <DeleteOutlined />
            </div>
          </div>
          {/* 添加四个方向的控制点 */}
          <div className="control-point top-left"></div>
          <div className="control-point top-right"></div>
          <div className="control-point bottom-left"></div>
          <div className="control-point bottom-right"></div>
        </>
      )}
    </div>
  );
};

export default CanvasItem;
