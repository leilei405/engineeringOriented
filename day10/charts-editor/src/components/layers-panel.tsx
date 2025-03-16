"use client";
import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  MenuOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
  DownOutlined,
  RightOutlined,
} from "@ant-design/icons";
import type { ComponentData } from "../lib/types";
import styles from "../styles/layers-panel.module.scss";

interface LayersPanelProps {
  components: ComponentData[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  onToggleVisibility: (id: string) => void;
  onReorder: (startIndex: number, endIndex: number) => void;
}

export default function LayersPanel({
  components,
  selectedId,
  onSelect,
  onToggleVisibility,
  onReorder,
}: LayersPanelProps) {
  const [expanded, setExpanded] = useState(true);

  const sortedComponents = [...components].sort((a, b) => b.zIndex - a.zIndex);

  const handleDragEnd = (result: any) => {
    debugger;
    console.log(result, "result");
    if (!result.destination) {
      return;
    }
    onReorder(result.source.index, result.destination.index);
  };

  console.log(sortedComponents, "sortedComponents");

  return (
    <div className={styles.layersPanel}>
      <div
        className={styles.panelHeader}
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? <DownOutlined /> : <RightOutlined />}
        <span>大屏背景层级</span>
      </div>

      {expanded && (
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="layers">
            {(provided) => {
              return (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className={styles.layersList}
                >
                  {sortedComponents.map((component, index) => (
                    <Draggable
                      key={component.id}
                      draggableId={component.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className={`${styles.layerItem} ${
                            selectedId === component.id ? styles.selected : ""
                          }`}
                          onClick={() => onSelect(component.id)}
                        >
                          <div
                            {...provided.dragHandleProps}
                            className={styles.dragHandle}
                          >
                            <MenuOutlined />
                          </div>
                          <div className={styles.layerIcon}>⚡</div>
                          <div className={styles.layerTitle}>
                            {component.title ||
                              `组件${component.id.slice(0, 4)}`}
                          </div>
                          <div
                            className={styles.visibilityToggle}
                            onClick={(e) => {
                              e.stopPropagation();
                              onToggleVisibility(component.id);
                            }}
                          >
                            {component.visible ? (
                              <EyeOutlined />
                            ) : (
                              <EyeInvisibleOutlined />
                            )}
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              );
            }}
          </Droppable>
        </DragDropContext>
      )}
    </div>
  );
}
