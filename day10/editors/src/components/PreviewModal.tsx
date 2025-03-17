import type React from "react";
import { Modal, Select, Button } from "antd";
import type { CanvasElement } from "../types";
import LabelElement from "./elements/LabelElement";
import TextElement from "./elements/TextElement";
import ImageElement from "./elements/ImageElement";
import IndicatorElement from "./elements/IndicatorElement";
import TableElement from "./elements/TableElement";
import ChartElement from "./elements/ChartElement";
import { ExportOutlined } from "@ant-design/icons";
import "../styles/PreviewModal.scss";

interface PreviewModalProps {
  visible: boolean;
  elements: CanvasElement[];
  onClose: () => void;
}

const PreviewModal: React.FC<PreviewModalProps> = ({
  visible,
  elements,
  onClose,
}) => {
  const renderElementContent = (element: CanvasElement) => {
    switch (element.type) {
      case "label":
        return <LabelElement element={element} />;
      case "text":
        return <TextElement element={element} />;
      case "image":
        return <ImageElement element={element} />;
      case "indicator":
        return <IndicatorElement element={element} />;
      case "table":
        return <TableElement element={element} />;
      case "chart":
        return <ChartElement element={element} />;
      default:
        return <div>未知元素类型</div>;
    }
  };

  // 按照zIndex排序，确保渲染顺序正确
  const sortedElements = [...elements].sort((a, b) => a.zIndex - b.zIndex);

  return (
    <Modal
      title="大屏数据预览"
      open={visible}
      onCancel={onClose}
      footer={null}
      width="90%"
      className="preview-modal"
    >
      <div className="preview-header">
        <div className="preview-title">大屏数据预览</div>
        <div className="preview-controls">
          <span className="period-label">期间</span>
          <Select defaultValue="2024" style={{ width: 120 }}>
            <Select.Option value="2023">2023</Select.Option>
            <Select.Option value="2024">2024</Select.Option>
            <Select.Option value="2025">2025</Select.Option>
          </Select>
          <Button type="primary" icon={<ExportOutlined />}>
            导出
          </Button>
        </div>
      </div>
      <div className="preview-container">
        {sortedElements.map(
          (element) =>
            element.visible && (
              <div
                key={element.id}
                className="preview-item"
                style={{
                  left: `${element.position.x}px`,
                  top: `${element.position.y}px`,
                  width: `${element.size.width}px`,
                  height: `${element.size.height}px`,
                  zIndex: element.zIndex,
                }}
              >
                {renderElementContent(element)}
              </div>
            )
        )}
      </div>
    </Modal>
  );
};

export default PreviewModal;
