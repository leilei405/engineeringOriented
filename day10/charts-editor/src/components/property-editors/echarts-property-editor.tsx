"use client";

import { useState } from "react";
import { Button, Select, Divider } from "antd";
import type { ComponentData } from "../../lib/types";
import styles from "../../styles/property-editors/echarts-property-editor.module.scss";

interface EChartsPropertyEditorProps {
  component: ComponentData;
  onUpdate: (updates: Partial<ComponentData>) => void;
}

export default function EChartsPropertyEditor({
  component,
  onUpdate,
}: EChartsPropertyEditorProps) {
  const [chartType, setChartType] = useState(
    component.data?.chartType || "bar"
  );

  const handleChartTypeChange = (value: string) => {
    setChartType(value);

    onUpdate({
      data: {
        ...component.data,
        chartType: value,
      },
    });
  };

  return (
    <div className={styles.echartsPropertyEditor}>
      <Divider orientation="left">图表设置</Divider>

      <div className={styles.formItem}>
        <div className={styles.label}>图表类型</div>
        <Select
          className={styles.select}
          value={chartType}
          onChange={handleChartTypeChange}
        >
          <Select.Option value="bar">柱状图</Select.Option>
          <Select.Option value="line">折线图</Select.Option>
          <Select.Option value="pie">饼图</Select.Option>
        </Select>
      </div>

      <div className={styles.formItem}>
        <div className={styles.label}>数据来源</div>
        <Select className={styles.select} defaultValue="manual">
          <Select.Option value="manual">手动输入</Select.Option>
          <Select.Option value="api">API接口</Select.Option>
          <Select.Option value="database">数据库</Select.Option>
        </Select>
      </div>

      <div className={styles.advancedConfig}>
        <div className={styles.advancedLabel}>高级配置:</div>
        <div className={styles.configCode}>
          <pre>
            {JSON.stringify(
              {
                title: { text: "图表标题" },
                xAxis: { data: ["1月", "2月", "3月", "4月", "5月", "6月"] },
                series: [{ data: [120, 200, 150, 80, 70, 110], type: "bar" }],
              },
              null,
              2
            )}
          </pre>
        </div>
        <Button className={styles.editButton}>编辑配置</Button>
      </div>
    </div>
  );
}
