"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Layout } from "antd";
import ToolBar from "./components/ToolBar";
import LayerPanel from "./components/LayerPanel";
import Canvas from "./components/Canvas";
import PropertyPanel from "./components/PropertyPanel";
import PreviewModal from "./components/PreviewModal";
import ChartSelector from "./components/selectors/ChartSelector";
import TableSelector from "./components/selectors/TableSelector";
import IndicatorSelector from "./components/selectors/IndicatorSelector";
import { DndContext } from "@dnd-kit/core";
import type { ElementType, CanvasElement } from "./types";
import "./styles/global.scss";
import "./App.scss";

const { Header, Sider, Content } = Layout;

const App: React.FC = () => {
  const [elements, setElements] = useState<CanvasElement[]>([]);
  const [selectedElement, setSelectedElement] = useState<CanvasElement | null>(
    null
  );
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const [layerPanelVisible, setLayerPanelVisible] = useState(true);
  const [chartSelectorVisible, setChartSelectorVisible] = useState(false);
  const [tableSelectorVisible, setTableSelectorVisible] = useState(false);
  const [indicatorSelectorVisible, setIndicatorSelectorVisible] =
    useState(false);

  const handleAddElement = (type: ElementType) => {
    let hh = type === "table" ? 300 : 200;
    // 对于表格、图表和指标，先打开选择器
    if (type === "chart") {
      setChartSelectorVisible(true);
      return;
    } else if (type === "table") {
      setTableSelectorVisible(true);
      return;
    } else if (type === "indicator") {
      setIndicatorSelectorVisible(true);
      return;
    }

    // 其他元素直接添加

    const newElement: CanvasElement = {
      id: `element-${Date.now()}`,
      type,
      position: { x: 100, y: 100 },
      size: { width: 200, height: hh },
      content: type === "label" ? "标签文本" : "",
      visible: true,
      zIndex: elements.length,
      properties: {
        fontSize: type === "label" ? 18 : 14,
        fontColor: "#000000",
        backgroundColor: type === "label" ? "transparent" : "#ffffff",
        borderColor: "#e8e8e8",
        borderWidth: 1,
        borderStyle: "solid",
        // 为图片元素添加默认图片URL
        imageUrl:
          type === "image"
            ? "https://lowcodedemo.top/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20241104203230.jpg"
            : "",
        textAlign: type === "label" ? "center" : "left",
      },
    };

    setElements([...elements, newElement]);
    setSelectedElement(newElement);
  };

  const handleSelectElement = (element: CanvasElement | null) => {
    setSelectedElement(element);
  };

  const handleUpdateElement = (updatedElement: CanvasElement) => {
    setElements(
      elements.map((el) => (el.id === updatedElement.id ? updatedElement : el))
    );

    // 如果当前选中的是被更新的元素，也更新选中状态
    if (selectedElement?.id === updatedElement.id) {
      setSelectedElement(updatedElement);
    }
  };

  const handleDeleteElement = (id: string) => {
    setElements(elements.filter((el) => el.id !== id));
    if (selectedElement?.id === id) {
      setSelectedElement(null);
    }
  };

  const handleToggleElementVisibility = (id: string) => {
    setElements(
      elements.map((el) =>
        el.id === id ? { ...el, visible: !el.visible } : el
      )
    );
  };

  const handleSave = () => {
    console.log("保存大屏配置", elements);
    // 实际项目中这里会发送API请求保存配置
  };

  const handlePreview = () => {
    setIsPreviewVisible(true);
  };

  const handleLayerReorder = (activeId: string, overId: string) => {
    if (activeId === overId) return;

    const oldIndex = elements.findIndex((el) => el.id === activeId);
    const newIndex = elements.findIndex((el) => el.id === overId);

    const newElements = [...elements];
    const [movedItem] = newElements.splice(oldIndex, 1);
    newElements.splice(newIndex, 0, movedItem);

    // 更新zIndex
    const updatedElements = newElements.map((el, index) => ({
      ...el,
      zIndex: index,
    }));

    setElements(updatedElements);
  };

  const toggleLayerPanel = () => {
    setLayerPanelVisible(!layerPanelVisible);
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
        handleDeleteElement(selectedElement.id);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedElement]);

  const handleChartSelect = (
    chartId: string,
    chartName: string,
    chartType: string
  ) => {
    const newElement: CanvasElement = {
      id: `element-${Date.now()}`,
      type: "chart",
      position: { x: 100, y: 100 },
      size: { width: 400, height: 300 },
      content: "",
      visible: true,
      zIndex: elements.length,
      properties: {
        chartId,
        chartName,
        chartType,
        fontSize: 14,
        fontColor: "#000000",
        backgroundColor: "#ffffff",
        borderColor: "#e8e8e8",
        borderWidth: 1,
        borderStyle: "solid",
        data: [
          { month: "2024-01", value: 120 },
          { month: "2024-02", value: 100 },
          { month: "2024-03", value: 125 },
          { month: "2024-04", value: 123 },
          { month: "2024-05", value: 127 },
          { month: "2024-06", value: 130 },
          { month: "2024-07", value: 135 },
          { month: "2024-08", value: 140 },
          { month: "2024-09", value: 145 },
          { month: "2024-10", value: 150 },
          { month: "2024-11", value: 155 },
          { month: "2024-12", value: 160 },
        ],
      },
    };

    setElements([...elements, newElement]);
    setSelectedElement(newElement);
    setChartSelectorVisible(false);
  };

  const handleTableSelect = (tableId: string, tableName: string) => {
    const newElement: CanvasElement = {
      id: `element-${Date.now()}`,
      type: "table",
      position: { x: 100, y: 100 },
      size: { width: 500, height: 300 },
      content: "",
      visible: true,
      zIndex: elements.length,
      properties: {
        tableId,
        tableName,
        fontSize: 14,
        fontColor: "#000000",
        backgroundColor: "#ffffff",
        borderColor: "#e8e8e8",
        borderWidth: 1,
        borderStyle: "solid",
        pageSize: 10,
        columns: [
          { title: "公司", dataIndex: "company", key: "company" },
          { title: "碳排放量 (t)", dataIndex: "emission", key: "emission" },
        ],
        data: [
          { key: "1", company: "石家庄", emission: "55452" },
          { key: "2", company: "承担", emission: "55452" },
          { key: "3", company: "张家口", emission: "55452" },
          { key: "4", company: "秦皇岛", emission: "55452" },
          { key: "5", company: "唐山", emission: "55452" },
          { key: "6", company: "雄安", emission: "55452" },
          { key: "7", company: "保定", emission: "55452" },
        ],
      },
    };

    setElements([...elements, newElement]);
    setSelectedElement(newElement);
    setTableSelectorVisible(false);
  };

  const handleIndicatorSelect = (
    indicatorId: string,
    indicatorName: string,
    unit: string
  ) => {
    const newElement: CanvasElement = {
      id: `element-${Date.now()}`,
      type: "indicator",
      position: { x: 100, y: 100 },
      size: { width: 200, height: 150 },
      content: "",
      visible: true,
      zIndex: elements.length,
      properties: {
        indicatorId,
        indicatorName,
        unit,
        fontSize: 24,
        fontColor: "#1890ff",
        titleFontSize: 16,
        titleFontColor: "#000000",
        backgroundColor: "#ffffff",
        borderColor: "#e8e8e8",
        borderWidth: 1,
        borderStyle: "solid",
        prefix: "",
        suffix: unit,
        value: "2,323,499.981",
      },
    };

    setElements([...elements, newElement]);
    setSelectedElement(newElement);
    setIndicatorSelectorVisible(false);
  };

  return (
    <DndContext
      onDragEnd={({ active, over }) => {
        if (over && active.id !== over.id) {
          handleLayerReorder(active.id as string, over.id as string);
        }
      }}
    >
      <Layout className="app-container">
        <Header className="app-header">
          <ToolBar
            onAddElement={handleAddElement}
            onSave={handleSave}
            onPreview={handlePreview}
            onToggleLayerPanel={toggleLayerPanel}
            layerPanelVisible={layerPanelVisible}
          />
        </Header>
        <Layout>
          {layerPanelVisible && (
            <Sider width={250} className="layer-panel-container">
              <LayerPanel
                elements={elements}
                onSelectElement={handleSelectElement}
                onToggleVisibility={handleToggleElementVisibility}
                onDeleteElement={handleDeleteElement}
                selectedElementId={selectedElement?.id}
              />
            </Sider>
          )}
          <Content className="canvas-container">
            <Canvas
              elements={elements}
              selectedElement={selectedElement}
              onSelectElement={handleSelectElement}
              onUpdateElement={handleUpdateElement}
              onDeleteElement={handleDeleteElement}
            />
          </Content>
          <Sider width={300} className="property-panel-container">
            <PropertyPanel
              selectedElement={selectedElement}
              onUpdateElement={handleUpdateElement}
              onDeleteElement={handleDeleteElement}
            />
          </Sider>
        </Layout>
        <PreviewModal
          visible={isPreviewVisible}
          elements={elements}
          onClose={() => setIsPreviewVisible(false)}
        />

        {/* 选择器弹窗 */}
        <ChartSelector
          visible={chartSelectorVisible}
          onCancel={() => setChartSelectorVisible(false)}
          onSelect={handleChartSelect}
        />
        <TableSelector
          visible={tableSelectorVisible}
          onCancel={() => setTableSelectorVisible(false)}
          onSelect={handleTableSelect}
        />
        <IndicatorSelector
          visible={indicatorSelectorVisible}
          onCancel={() => setIndicatorSelectorVisible(false)}
          onSelect={handleIndicatorSelect}
        />
      </Layout>
    </DndContext>
  );
};

export default App;
