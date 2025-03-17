import React from "react";
import { CanvasElement } from "../../types";

interface TextElementProps {
  element: CanvasElement;
}

const TextElement: React.FC<TextElementProps> = ({ element }) => {
  const { content, properties } = element;
  const fontSize = properties.fontSize || 14;
  const fontColor = properties.fontColor || "#000000";
  const backgroundColor = properties.backgroundColor || "#ffffff";
  const textAlign = properties.textAlign || "left";
  const borderColor = properties.borderColor || "#e8e8e8";
  const borderWidth = properties.borderWidth || 1;
  const borderStyle = properties.borderStyle || "solid";

  return (
    <div
      className="text-element"
      style={{
        fontSize: `${fontSize}px`,
        color: fontColor,
        backgroundColor,
        textAlign,
        width: "100%",
        height: "100%",
        padding: "8px",
        overflow: "auto",
        pointerEvents: "none", // 防止文本选择干扰拖拽
        border:
          borderWidth > 0
            ? `${borderWidth}px ${borderStyle} ${borderColor}`
            : "none",
      }}
    >
      {content}
    </div>
  );
};

export default TextElement;
