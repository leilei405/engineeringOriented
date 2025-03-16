"use client";

import { useEffect } from "react";
import { Input, Button, Form, InputNumber, Divider } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import type { ComponentData } from "../lib/types";
import ImagePropertyEditor from "./property-editors/image-property-editor";
import TablePropertyEditor from "./property-editors/table-property-editor";
import EChartsPropertyEditor from "./property-editors/echarts-property-editor";
import IndicatorPropertyEditor from "./property-editors/indicator-property-editor";
import styles from "../styles/property-panel.module.scss";

interface PropertyPanelProps {
  component: ComponentData | null;
  onUpdate: (updates: Partial<ComponentData>) => void;
  onDelete: () => void;
}

export default function PropertyPanel({
  component,
  onUpdate,
  onDelete,
}: PropertyPanelProps) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (component) {
      form.setFieldsValue({
        title: component.title || "",
        x: component.x,
        y: component.y,
        width: component.width,
        height: component.height,
      });
    }
  }, [component, form]);

  const handleValuesChange = (changedValues: any) => {
    onUpdate(changedValues);
  };

  if (!component) {
    return <div className={styles.emptyPanel}>请选择一个组件进行编辑</div>;
  }

  return (
    <div className={styles.propertyPanel}>
      <div className={styles.panelHeader}>
        <h3>组件属性</h3>
        <Button
          danger
          icon={<DeleteOutlined />}
          onClick={onDelete}
          size="small"
        />
      </div>

      <Form
        form={form}
        layout="vertical"
        onValuesChange={handleValuesChange}
        initialValues={{
          title: component.title || "",
          x: component.x,
          y: component.y,
          width: component.width,
          height: component.height,
        }}
      >
        <Form.Item label="组件名称" name="title">
          <Input />
        </Form.Item>

        <Divider orientation="left">位置和大小</Divider>

        <div className={styles.positionGrid}>
          <Form.Item label="X" name="x">
            <InputNumber min={0} />
          </Form.Item>
          <Form.Item label="Y" name="y">
            <InputNumber min={0} />
          </Form.Item>
          <Form.Item label="宽度" name="width">
            <InputNumber min={10} />
          </Form.Item>
          <Form.Item label="高度" name="height">
            <InputNumber min={10} />
          </Form.Item>
        </div>

        {component.type === "image" && (
          <ImagePropertyEditor component={component} onUpdate={onUpdate} />
        )}

        {component.type === "table" && (
          <TablePropertyEditor component={component} onUpdate={onUpdate} />
        )}

        {component.type === "echarts" && (
          <EChartsPropertyEditor component={component} onUpdate={onUpdate} />
        )}

        {component.type === "indicator" && (
          <IndicatorPropertyEditor component={component} onUpdate={onUpdate} />
        )}
      </Form>
    </div>
  );
}
