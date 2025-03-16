"use client";

import { useState } from "react";
import { Button, Radio, Input, Select, Divider } from "antd";
import type { ComponentData } from "../../lib/types";
import styles from "../../styles/property-editors/table-property-editor.module.scss";

interface TablePropertyEditorProps {
  component: ComponentData;
  onUpdate: (updates: Partial<ComponentData>) => void;
}

export default function TablePropertyEditor({
  component,
  onUpdate,
}: TablePropertyEditorProps) {
  const [activeTab, setActiveTab] = useState<"data" | "style">("data");
  console.log(component, "component", onUpdate);

  return (
    <div className={styles.tablePropertyEditor}>
      <Divider orientation="left">表格设置</Divider>

      <div className={styles.tabs}>
        <Radio.Group
          value={activeTab}
          onChange={(e) => setActiveTab(e.target.value)}
          buttonStyle="solid"
        >
          <Radio.Button value="data">数据</Radio.Button>
          <Radio.Button value="style">样式</Radio.Button>
        </Radio.Group>
      </div>

      {activeTab === "data" && (
        <div className={styles.tabContent}>
          <div className={styles.formItem}>
            <div className={styles.label}>数据来源</div>
            <Select className={styles.select} defaultValue="manual">
              <Select.Option value="manual">手动输入</Select.Option>
              <Select.Option value="api">API接口</Select.Option>
              <Select.Option value="database">数据库</Select.Option>
            </Select>
          </div>

          <div className={styles.exampleData}>
            <div className={styles.exampleLabel}>示例数据：</div>
            <div className={styles.exampleCode}>
              <pre>
                {JSON.stringify(
                  [
                    {
                      key: "1",
                      column1: "数据1",
                      column2: "数据2",
                      column3: "数据3",
                    },
                    {
                      key: "2",
                      column1: "数据4",
                      column2: "数据5",
                      column3: "数据6",
                    },
                  ],
                  null,
                  2
                )}
              </pre>
            </div>
            <Button className={styles.editButton}>编辑数据</Button>
          </div>
        </div>
      )}

      {activeTab === "style" && (
        <div className={styles.tabContent}>
          <div className={styles.formItem}>
            <div className={styles.label}>表格样式</div>
            <Select className={styles.select} defaultValue="default">
              <Select.Option value="default">默认样式</Select.Option>
              <Select.Option value="dark">暗色样式</Select.Option>
              <Select.Option value="simple">简约样式</Select.Option>
            </Select>
          </div>

          <div className={styles.colorPickers}>
            <div className={styles.colorPicker}>
              <div className={styles.label}>边框颜色</div>
              <Input
                type="color"
                className={styles.colorInput}
                defaultValue="#d9d9d9"
              />
            </div>
            <div className={styles.colorPicker}>
              <div className={styles.label}>表头颜色</div>
              <Input
                type="color"
                className={styles.colorInput}
                defaultValue="#fafafa"
              />
            </div>
          </div>

          <div className={styles.checkbox}>
            <input type="checkbox" id="show-border" defaultChecked />
            <label htmlFor="show-border">显示边框</label>
          </div>
        </div>
      )}
    </div>
  );
}
