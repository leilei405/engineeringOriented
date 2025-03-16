"use client";

import type React from "react";
import { forwardRef, useRef } from "react";
import { useDrop } from "react-dnd";
import DraggableComponent from "./draggable-component";
import type { ComponentData } from "../lib/types";
import styles from "../styles/canvas.module.scss";

interface CanvasProps {
  components: ComponentData[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  onUpdate: (id: string, updates: Partial<ComponentData>) => void;
  onDelete: (id: string) => void;
}

const Canvas = forwardRef<HTMLDivElement, CanvasProps>(
  ({ components, selectedId, onSelect, onUpdate, onDelete }, ref) => {
    const canvasRef = useRef<HTMLDivElement>(null);

    const [{ isOver }, drop] = useDrop(() => ({
      accept: "COMPONENT",
      drop: () => ({ name: "Canvas" }),
      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),
    }));

    // Connect the drop ref to the canvas ref
    const setRefs = (el: HTMLDivElement | null) => {
      // Apply the drop ref
      drop(el);

      // Forward the ref
      if (typeof ref === "function") {
        ref(el);
      } else if (ref) {
        ref.current = el;
      }

      // Set our local ref
      canvasRef.current = el;
    };

    const sortedComponents = [...components].sort(
      (a, b) => a.zIndex - b.zIndex
    );

    const handleCanvasClick = (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        onSelect(null);
      }
    };

    return (
      <div ref={setRefs} className={styles.canvas} onClick={handleCanvasClick}>
        {sortedComponents.map((component) =>
          component.visible ? (
            <DraggableComponent
              key={component.id}
              component={component}
              isSelected={component.id === selectedId}
              onSelect={() => onSelect(component.id)}
              onUpdate={(updates) => onUpdate(component.id, updates)}
              onDelete={() => onDelete(component.id)}
            />
          ) : null
        )}
      </div>
    );
  }
);

Canvas.displayName = "Canvas";

export default Canvas;
