"use client";

import { useEffect } from "react";
import { Input, Select, Form, Divider } from "antd";
import type { ComponentData } from "../../lib/types";
import styles from "../../styles/property-editors/indicator-property-editor.module.scss";

interface IndicatorPropertyEditorProps {
  component: ComponentData;
  onUpdate: (updates: Partial<ComponentData>) => void;
}

export default function IndicatorPropertyEditor({
  component,
  onUpdate,
}: IndicatorPropertyEditorProps) {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      value: component.data?.value || "",
      description: component.data?.description || "",
      trend: component.data?.trend || "up",
      color: component.data?.color || "blue",
    });
  }, [component, form]);

  const handleValuesChange = (changedValues: any) => {
    onUpdate({
      data: {
        ...component.data,
        ...changedValues,
      },
    });
  };

  return (
    <div className={styles.indicatorPropertyEditor}>
      <Divider orientation="left">指标设置</Divider>

      <Form form={form} layout="vertical" onValuesChange={handleValuesChange}>
        <Form.Item label="指标值" name="value">
          <Input />
        </Form.Item>

        <Form.Item label="指标描述" name="description">
          <Input />
        </Form.Item>

        <Form.Item label="趋势" name="trend">
          <Select>
            <Select.Option value="up">上升</Select.Option>
            <Select.Option value="down">下降</Select.Option>
            <Select.Option value="none">无变化</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="颜色" name="color">
          <Select>
            <Select.Option value="blue">蓝色</Select.Option>
            <Select.Option value="green">绿色</Select.Option>
            <Select.Option value="red">红色</Select.Option>
            <Select.Option value="orange">橙色</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </div>
  );
}
