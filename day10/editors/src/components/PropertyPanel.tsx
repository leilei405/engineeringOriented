"use client";

import React, { useEffect } from "react";
import {
  Form,
  Input,
  InputNumber,
  Button,
  Upload,
  Select,
  Divider,
  ColorPicker,
} from "antd";
import { UploadOutlined, DeleteOutlined } from "@ant-design/icons";
import type { CanvasElement } from "../types";
import ChartSelector from "./selectors/ChartSelector";
import TableSelector from "./selectors/TableSelector";
import IndicatorSelector from "./selectors/IndicatorSelector";
import "../styles/PropertyPanel.scss";

interface PropertyPanelProps {
  selectedElement: CanvasElement | null;
  onUpdateElement: (element: CanvasElement) => void;
  onDeleteElement: (id: string) => void;
}

const PropertyPanel: React.FC<PropertyPanelProps> = ({
  selectedElement,
  onUpdateElement,
  onDeleteElement,
}) => {
  const [form] = Form.useForm();
  const [chartSelectorVisible, setChartSelectorVisible] = React.useState(false);
  const [tableSelectorVisible, setTableSelectorVisible] = React.useState(false);
  const [indicatorSelectorVisible, setIndicatorSelectorVisible] =
    React.useState(false);

  // 当选中元素变化时，重置表单
  useEffect(() => {
    if (selectedElement) {
      form.setFieldsValue({
        x: selectedElement.position.x,
        y: selectedElement.position.y,
        width: selectedElement.size.width,
        height: selectedElement.size.height,
        content: selectedElement.content,
        ...selectedElement.properties,
      });
    } else {
      form.resetFields();
    }
  }, [selectedElement, form]);

  const handleValuesChange = (changedValues: any) => {
    if (!selectedElement) return;

    const updates: Partial<CanvasElement> = {};

    if ("x" in changedValues || "y" in changedValues) {
      updates.position = {
        x: "x" in changedValues ? changedValues.x : selectedElement.position.x,
        y: "y" in changedValues ? changedValues.y : selectedElement.position.y,
      };
    }

    if ("width" in changedValues || "height" in changedValues) {
      updates.size = {
        width:
          "width" in changedValues
            ? changedValues.width
            : selectedElement.size.width,
        height:
          "height" in changedValues
            ? changedValues.height
            : selectedElement.size.height,
      };
    }

    if ("content" in changedValues) {
      updates.content = changedValues.content;
    }

    // 处理其他属性
    const otherProperties = { ...selectedElement.properties };
    Object.keys(changedValues).forEach((key) => {
      if (!["x", "y", "width", "height", "content"].includes(key)) {
        otherProperties[key] = changedValues[key];
      }
    });
    updates.properties = otherProperties;

    onUpdateElement({ ...selectedElement, ...updates });
  };

  const openChartSelector = () => {
    setChartSelectorVisible(true);
  };

  const openTableSelector = () => {
    setTableSelectorVisible(true);
  };

  const openIndicatorSelector = () => {
    setIndicatorSelectorVisible(true);
  };

  const handleChartSelect = (
    chartId: string,
    chartName: string,
    chartType: string
  ) => {
    if (!selectedElement) return;

    onUpdateElement({
      ...selectedElement,
      properties: {
        ...selectedElement.properties,
        chartId,
        chartName,
        chartType,
      },
    });

    setChartSelectorVisible(false);
  };

  const handleTableSelect = (tableId: string, tableName: string) => {
    if (!selectedElement) return;

    onUpdateElement({
      ...selectedElement,
      properties: {
        ...selectedElement.properties,
        tableId,
        tableName,
      },
    });

    setTableSelectorVisible(false);
  };

  const handleIndicatorSelect = (
    indicatorId: string,
    indicatorName: string,
    unit: string
  ) => {
    if (!selectedElement) return;

    onUpdateElement({
      ...selectedElement,
      properties: {
        ...selectedElement.properties,
        indicatorId,
        indicatorName,
        unit,
        suffix: unit,
      },
    });

    setIndicatorSelectorVisible(false);
  };

  const handleDeleteElement = () => {
    if (selectedElement) {
      onDeleteElement(selectedElement.id);
    }
  };

  if (!selectedElement) {
    return (
      <div className="property-panel empty-panel">
        <p>请选择一个元素以编辑其属性</p>
      </div>
    );
  }

  const renderCommonStyleProperties = () => {
    return (
      <>
        <Form.Item name="backgroundColor" label="背景颜色">
          <ColorPicker />
        </Form.Item>
        <Form.Item name="borderColor" label="边框颜色">
          <ColorPicker />
        </Form.Item>
        <Form.Item name="borderWidth" label="边框宽度">
          <InputNumber min={0} max={10} />
        </Form.Item>
        <Form.Item name="borderStyle" label="边框样式">
          <Select>
            <Select.Option value="solid">实线</Select.Option>
            <Select.Option value="dashed">虚线</Select.Option>
            <Select.Option value="dotted">点线</Select.Option>
            <Select.Option value="none">无</Select.Option>
          </Select>
        </Form.Item>
      </>
    );
  };

  const renderElementSpecificProperties = () => {
    switch (selectedElement.type) {
      case "label":
        return (
          <>
            <Form.Item name="content" label="文本内容">
              <Input.TextArea rows={4} />
            </Form.Item>
            <Form.Item name="fontSize" label="字体大小">
              <InputNumber min={12} max={72} />
            </Form.Item>
            <Form.Item name="fontColor" label="字体颜色">
              <ColorPicker />
            </Form.Item>
            <Form.Item name="textAlign" label="对齐方式">
              <Select>
                <Select.Option value="left">左对齐</Select.Option>
                <Select.Option value="center">居中</Select.Option>
                <Select.Option value="right">右对齐</Select.Option>
              </Select>
            </Form.Item>
            {renderCommonStyleProperties()}
          </>
        );

      case "text":
        return (
          <>
            <Form.Item name="content" label="文本内容">
              <Input.TextArea rows={4} />
            </Form.Item>
            <Form.Item name="fontSize" label="字体大小">
              <InputNumber min={12} max={72} />
            </Form.Item>
            <Form.Item name="fontColor" label="字体颜色">
              <ColorPicker />
            </Form.Item>
            <Form.Item name="textAlign" label="对齐方式">
              <Select>
                <Select.Option value="left">左对齐</Select.Option>
                <Select.Option value="center">居中</Select.Option>
                <Select.Option value="right">右对齐</Select.Option>
              </Select>
            </Form.Item>
            {renderCommonStyleProperties()}
          </>
        );

      case "image":
        return (
          <>
            <Form.Item name="imageUrl" label="图片地址">
              <Input />
            </Form.Item>
            <Form.Item label="上传图片">
              <Upload>
                <Button icon={<UploadOutlined />}>选择图片</Button>
              </Upload>
            </Form.Item>
            <Form.Item name="objectFit" label="填充方式">
              <Select>
                <Select.Option value="contain">适应</Select.Option>
                <Select.Option value="cover">填充</Select.Option>
                <Select.Option value="fill">拉伸</Select.Option>
              </Select>
            </Form.Item>
            {renderCommonStyleProperties()}
          </>
        );

      case "indicator":
        return (
          <>
            <Form.Item label="指标">
              <Input
                value={selectedElement.properties.indicatorName || ""}
                readOnly
                addonAfter={
                  <Button type="link" onClick={openIndicatorSelector}>
                    选择
                  </Button>
                }
              />
            </Form.Item>
            <Form.Item name="value" label="指标值">
              <Input />
            </Form.Item>
            <Form.Item name="prefix" label="前缀">
              <Input />
            </Form.Item>
            <Form.Item name="suffix" label="后缀">
              <Input />
            </Form.Item>
            <Form.Item name="fontSize" label="数值字体大小">
              <InputNumber min={12} max={72} />
            </Form.Item>
            <Form.Item name="fontColor" label="数值字体颜色">
              <ColorPicker />
            </Form.Item>
            <Form.Item name="titleFontSize" label="标题字体大小">
              <InputNumber min={12} max={72} />
            </Form.Item>
            <Form.Item name="titleFontColor" label="标题字体颜色">
              <ColorPicker />
            </Form.Item>
            {renderCommonStyleProperties()}
          </>
        );

      case "table":
        return (
          <>
            <Form.Item label="表格">
              <Input
                value={selectedElement.properties.tableName || ""}
                readOnly
                addonAfter={
                  <Button type="link" onClick={openTableSelector}>
                    选择
                  </Button>
                }
              />
            </Form.Item>
            <Form.Item name="pageSize" label="每页行数">
              <Select>
                <Select.Option value={5}>5条/页</Select.Option>
                <Select.Option value={10}>10条/页</Select.Option>
                <Select.Option value={20}>20条/页</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item name="fontSize" label="字体大小">
              <InputNumber min={12} max={24} />
            </Form.Item>
            <Form.Item name="fontColor" label="字体颜色">
              <ColorPicker />
            </Form.Item>
            <Form.Item name="headerBgColor" label="表头背景色">
              <ColorPicker />
            </Form.Item>
            {renderCommonStyleProperties()}
          </>
        );

      case "chart":
        return (
          <>
            <Form.Item label="图表">
              <Input
                value={selectedElement.properties.chartName || ""}
                readOnly
                addonAfter={
                  <Button type="link" onClick={openChartSelector}>
                    选择
                  </Button>
                }
              />
            </Form.Item>
            <Form.Item name="chartType" label="图表类型">
              <Select>
                <Select.Option value="bar">柱状图</Select.Option>
                <Select.Option value="line">折线图</Select.Option>
                <Select.Option value="pie">饼图</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item name="fontSize" label="字体大小">
              <InputNumber min={12} max={24} />
            </Form.Item>
            <Form.Item name="fontColor" label="字体颜色">
              <ColorPicker />
            </Form.Item>
            <Form.Item name="titleFontSize" label="标题字体大小">
              <InputNumber min={12} max={24} />
            </Form.Item>
            <Form.Item name="titleFontColor" label="标题字体颜色">
              <ColorPicker />
            </Form.Item>
            {renderCommonStyleProperties()}
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="property-panel">
      <div className="property-panel-header">
        <h3>属性设置</h3>
        <Button
          type="primary"
          danger
          icon={<DeleteOutlined />}
          onClick={handleDeleteElement}
        >
          删除元素
        </Button>
      </div>
      <Form form={form} layout="vertical" onValuesChange={handleValuesChange}>
        <div className="property-section">
          <h4>位置和大小</h4>
          <div className="position-size-grid">
            <Form.Item name="x" label="X">
              <InputNumber />
            </Form.Item>
            <Form.Item name="y" label="Y">
              <InputNumber />
            </Form.Item>
            <Form.Item name="width" label="宽">
              <InputNumber min={10} />
            </Form.Item>
            <Form.Item name="height" label="高">
              <InputNumber min={10} />
            </Form.Item>
          </div>
        </div>

        <Divider style={{ margin: "12px 0" }} />

        <div className="property-section">
          <h4>样式</h4>
          {renderElementSpecificProperties()}
        </div>
      </Form>

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
    </div>
  );
};

export default PropertyPanel;
