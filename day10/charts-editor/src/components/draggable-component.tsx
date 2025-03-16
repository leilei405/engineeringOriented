"use client";
import type React from "react";
import { useRef, useState, useEffect } from "react";
import { Rnd } from "react-rnd";
import { DeleteOutlined } from "@ant-design/icons";
import type { ComponentData } from "../lib/types";
import ComponentRenderer from "./component-renderer";
import styles from "../styles/draggable-component.module.scss";

interface DraggableComponentProps {
  component: ComponentData;
  isSelected: boolean;
  onSelect: () => void;
  onUpdate: (updates: Partial<ComponentData>) => void;
  onDelete: () => void;
}

export default function DraggableComponent({
  component,
  isSelected,
  onSelect,
  onUpdate,
  onDelete,
}: DraggableComponentProps) {
  const [size, setSize] = useState({
    width: component.width,
    height: component.height,
  });
  const [position, setPosition] = useState({ x: component.x, y: component.y });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setPosition({ x: component.x, y: component.y });
    setSize({ width: component.width, height: component.height });
  }, [component.x, component.y, component.width, component.height]);

  useEffect(() => {
    if (isSelected && ref.current) {
      ref.current.focus();
    }
  }, [isSelected]);

  const handleResizeStop = (
    e: any,
    direction: any,
    ref: any,
    delta: any,
    position: any
  ) => {
    const { width, height } = ref.style;

    onUpdate({
      width: Number.parseInt(width),
      height: Number.parseInt(height),
      x: position.x,
      y: position.y,
    });
  };

  const handleDragStop = (e: any, d: any) => {
    onUpdate({
      x: d.x,
      y: d.y,
    });
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect();
  };

  return (
    <Rnd
      size={{ width: size.width, height: size.height }}
      position={{ x: position.x, y: position.y }}
      onDragStop={handleDragStop}
      onResizeStop={handleResizeStop}
      onClick={handleClick}
      bounds="parent"
      className={`${styles.draggableComponent} ${
        isSelected ? styles.selected : ""
      }`}
      resizeHandleClasses={
        {
          // bottomRight: styles.resizeHandleBottomRight,
          // bottomLeft: styles.resizeHandleBottomLeft,
          // topRight: styles.resizeHandleTopRight,
          // topLeft: styles.resizeHandleTopLeft,
          // top: styles.resizeHandleTop,
          // right: styles.resizeHandleRight,
          // bottom: styles.resizeHandleBottom,
          // left: styles.resizeHandleLeft,
        }
      }
    >
      <div ref={ref} className={styles.componentWrapper} tabIndex={0}>
        {isSelected && (
          <div className={styles.componentHeader}>
            <div className={styles.componentTitle}>
              <span>{component.title}</span>
              <DeleteOutlined
                className={styles.deleteIcon}
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete();
                }}
              />
            </div>
          </div>
        )}
        <ComponentRenderer component={component} />
        {isSelected && <div className={styles.zapIcon}>⚡</div>}
      </div>
    </Rnd>
  );
}
