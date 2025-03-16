"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Input, Button, Form, Divider } from "antd";
import type { ComponentData } from "../../lib/types";
import styles from "../../styles/property-editors/image-property-editor.module.scss";

interface ImagePropertyEditorProps {
  component: ComponentData;
  onUpdate: (updates: Partial<ComponentData>) => void;
}

export default function ImagePropertyEditor({
  component,
  onUpdate,
}: ImagePropertyEditorProps) {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    setImageUrl(component.data?.url || "");
  }, [component]);

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl(e.target.value);
  };

  const handleApply = () => {
    onUpdate({
      data: {
        ...component.data,
        url: imageUrl,
      },
    });
  };

  return (
    <div className={styles.imagePropertyEditor}>
      <Divider orientation="left">图片设置</Divider>

      <Form.Item label="图片链接">
        <Input
          value={imageUrl}
          onChange={handleImageUrlChange}
          placeholder="/placeholder.svg?height=150&width=250"
        />
        <Button className={styles.applyButton} onClick={handleApply}>
          应用
        </Button>
      </Form.Item>

      <div className={styles.previewContainer}>
        <div className={styles.previewLabel}>图片预览</div>
        <div className={styles.preview}>
          {imageUrl ? (
            <img
              src={imageUrl || "/placeholder.svg"}
              alt="预览"
              className={styles.previewImage}
            />
          ) : (
            <span className={styles.noImage}>无图片</span>
          )}
        </div>
      </div>

      <Button className={styles.selectButton}>选择图片</Button>
    </div>
  );
}
