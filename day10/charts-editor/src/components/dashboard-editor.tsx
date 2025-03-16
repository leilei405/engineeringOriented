"use client";

import { useState, useRef } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Layout, Button } from "antd";
import { SaveOutlined, EyeOutlined } from "@ant-design/icons";
import Toolbar from "./toolbar";
import Canvas from "./canvas";
import PropertyPanel from "./property-panel";
import LayersPanel from "./layers-panel";
import { generateId } from "../lib/utils";
import type { ComponentType, ComponentData } from "../lib/types";
import ChartSelectorModal from "./selectors/chart-selector-modal";
import TableSelectorModal from "./selectors/table-selector-modal";
import IndicatorSelectorModal from "./selectors/indicator-selector-modal";

import styles from "../styles/dashboard-editor.module.scss";

const { Header, Sider, Content } = Layout;

export default function DashboardEditor() {
  const [components, setComponents] = useState<ComponentData[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showLayers, setShowLayers] = useState(true);
  const canvasRef = useRef<HTMLDivElement>(null);

  // 选择器模态框状态
  const [chartSelectorVisible, setChartSelectorVisible] = useState(false);
  const [tableSelectorVisible, setTableSelectorVisible] = useState(false);
  const [indicatorSelectorVisible, setIndicatorSelectorVisible] =
    useState(false);

  const addComponent = (type: ComponentType) => {
    // 对于特殊类型，打开选择器模态框
    if (type === "echarts") {
      setChartSelectorVisible(true);
      return;
    } else if (type === "table") {
      setTableSelectorVisible(true);
      return;
    } else if (type === "indicator") {
      setIndicatorSelectorVisible(true);
      return;
    }

    // 对于其他类型，直接添加组件
    const newComponent: ComponentData = {
      id: generateId(),
      type,
      x: 100,
      y: 100,
      width: 300,
      height: type === "table" ? 250 : type === "echarts" ? 300 : 100,
      zIndex: components.length,
      data: {},
      title: getDefaultTitle(type),
      visible: true,
    };
    setComponents([...components, newComponent]);
    setSelectedId(newComponent.id);
  };

  const addChartComponent = (chartInfo: any) => {
    const newComponent: ComponentData = {
      id: generateId(),
      type: "echarts",
      x: 100,
      y: 100,
      width: 400,
      height: 300,
      zIndex: components.length,
      data: {
        chartType: chartInfo.chartType || "bar",
        title: chartInfo.name || "图表",
        description: chartInfo.description || "",
      },
      title: chartInfo.name || "图表",
      visible: true,
    };
    setComponents([...components, newComponent]);
    setSelectedId(newComponent.id);
    setChartSelectorVisible(false);
  };

  const addTableComponent = (tableInfo: any) => {
    const newComponent: ComponentData = {
      id: generateId(),
      type: "table",
      x: 100,
      y: 100,
      width: 500,
      height: 300,
      zIndex: components.length,
      data: {
        title: tableInfo.name || "表格",
        description: tableInfo.description || "",
      },
      title: tableInfo.name || "表格",
      visible: true,
    };
    setComponents([...components, newComponent]);
    setSelectedId(newComponent.id);
    setTableSelectorVisible(false);
  };

  const addIndicatorComponent = (indicatorInfo: any) => {
    const newComponent: ComponentData = {
      id: generateId(),
      type: "indicator",
      x: 100,
      y: 100,
      width: 200,
      height: 100,
      zIndex: components.length,
      data: {
        value: indicatorInfo.name || "指标值",
        description: indicatorInfo.description || "指标描述",
        unit: indicatorInfo.unit || "",
      },
      title: indicatorInfo.name || "指标",
      visible: true,
    };
    setComponents([...components, newComponent]);
    setSelectedId(newComponent.id);
    setIndicatorSelectorVisible(false);
  };

  const getDefaultTitle = (type: ComponentType): string => {
    switch (type) {
      case "label":
        return "文本标签";
      case "text":
        return "文本框";
      case "image":
        return "图片";
      case "indicator":
        return "指标";
      case "table":
        return "表格";
      case "echarts":
        return "图表";
      default:
        return "组件";
    }
  };

  const updateComponent = (id: string, updates: Partial<ComponentData>) => {
    setComponents(
      components.map((comp) =>
        comp.id === id ? { ...comp, ...updates } : comp
      )
    );
  };

  const deleteComponent = (id: string) => {
    setComponents(components.filter((comp) => comp.id !== id));
    if (selectedId === id) {
      setSelectedId(null);
    }
  };

  const handleSelect = (id: string | null) => {
    setSelectedId(id);
  };

  const handleSave = () => {
    console.log("保存大屏", components);
    // 这里可以实现保存逻辑
  };

  const handlePreview = () => {
    console.log("预览大屏");
    // 这里可以实现预览逻辑
  };

  const toggleComponentVisibility = (id: string) => {
    setComponents(
      components.map((comp) =>
        comp.id === id ? { ...comp, visible: !comp.visible } : comp
      )
    );
  };

  const reorderComponents = (startIndex: number, endIndex: number) => {
    const result = Array.from(components);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    // 更新 zIndex 以反映新顺序
    const updatedComponents = result.map((comp, index) => ({
      ...comp,
      zIndex: result.length - index - 1,
    }));

    setComponents(updatedComponents);
  };

  const selectedComponent = selectedId
    ? components.find((comp) => comp.id === selectedId)
    : null;

  return (
    <DndProvider backend={HTML5Backend}>
      <Layout className={styles.dashboardEditor}>
        <Header className={styles.header}>
          <Toolbar onAddComponent={addComponent} />
          <div className={styles.actions}>
            <Button type="primary" icon={<SaveOutlined />} onClick={handleSave}>
              保存
            </Button>
            <Button
              type="primary"
              icon={<EyeOutlined />}
              onClick={handlePreview}
            >
              预览
            </Button>
          </div>
        </Header>
        <Layout>
          {showLayers && (
            <Sider width={200} className={styles.sider}>
              <LayersPanel
                components={components}
                selectedId={selectedId}
                onSelect={handleSelect}
                onToggleVisibility={toggleComponentVisibility}
                onReorder={reorderComponents}
              />
            </Sider>
          )}
          <Content className={styles.content}>
            <Canvas
              ref={canvasRef}
              components={components}
              selectedId={selectedId}
              onSelect={handleSelect}
              onUpdate={updateComponent}
              onDelete={deleteComponent}
            />
          </Content>
          <Sider width={300} className={styles.sider}>
            <PropertyPanel
              component={selectedComponent}
              onUpdate={(updates) => {
                if (selectedId) updateComponent(selectedId, updates);
              }}
              onDelete={() => {
                if (selectedId) deleteComponent(selectedId);
              }}
            />
          </Sider>
        </Layout>

        {/* 选择器模态框 */}
        <ChartSelectorModal
          visible={chartSelectorVisible}
          onCancel={() => setChartSelectorVisible(false)}
          onSelect={addChartComponent}
        />
        <TableSelectorModal
          visible={tableSelectorVisible}
          onCancel={() => setTableSelectorVisible(false)}
          onSelect={addTableComponent}
        />
        <IndicatorSelectorModal
          visible={indicatorSelectorVisible}
          onCancel={() => setIndicatorSelectorVisible(false)}
          onSelect={addIndicatorComponent}
        />
      </Layout>
    </DndProvider>
  );
}
