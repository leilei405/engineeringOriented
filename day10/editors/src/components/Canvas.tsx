"use client";

// 修改 Canvas 组件，确保元素选择正确
import type React from "react";
import { useRef, useEffect } from "react";
import type { CanvasElement } from "../types";
import CanvasItem from "./CanvasItem";
import "../styles/Canvas.scss";

interface CanvasProps {
  elements: CanvasElement[];
  selectedElement: CanvasElement | null;
  onSelectElement: (element: CanvasElement | null) => void;
  onUpdateElement: (element: CanvasElement) => void;
  onDeleteElement: (id: string) => void;
}

const Canvas: React.FC<CanvasProps> = ({
  elements,
  selectedElement,
  onSelectElement,
  onUpdateElement,
  onDeleteElement,
}) => {
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleCanvasClick = (e: React.MouseEvent) => {
    // 如果点击的是画布本身而不是其中的元素，取消选择
    if (e.target === canvasRef.current) {
      onSelectElement(null);
    }
  };

  const handleElementMove = (
    id: string,
    position: { x: number; y: number }
  ) => {
    const element = elements.find((el) => el.id === id);
    if (element) {
      onUpdateElement({
        ...element,
        position,
      });
    }
  };

  const handleElementResize = (
    id: string,
    size: { width: number; height: number }
  ) => {
    const element = elements.find((el) => el.id === id);
    if (element) {
      onUpdateElement({
        ...element,
        size,
      });
    }
  };

  // 处理键盘删除事件
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.key === "Delete" || e.key === "Backspace") &&
        selectedElement &&
        !["INPUT", "TEXTAREA", "SELECT"].includes(
          (e.target as HTMLElement).tagName
        )
      ) {
        onDeleteElement(selectedElement.id);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedElement, onDeleteElement]);

  // 按照zIndex排序，确保渲染顺序正确
  const sortedElements = [...elements].sort((a, b) => a.zIndex - b.zIndex);

  return (
    <div className="canvas" ref={canvasRef} onClick={handleCanvasClick}>
      {sortedElements.map(
        (element) =>
          element.visible && (
            <CanvasItem
              key={element.id}
              element={element}
              isSelected={selectedElement?.id === element.id}
              onSelect={() => onSelectElement(element)}
              onMove={(position) => handleElementMove(element.id, position)}
              onResize={(size) => handleElementResize(element.id, size)}
              onDelete={() => onDeleteElement(element.id)}
            />
          )
      )}

      {/* 添加网格背景，帮助用户对齐元素 */}
      <div className="canvas-grid"></div>
    </div>
  );
};

export default Canvas;
