import type React from "react";
import type { CanvasElement } from "../../types";

interface LabelElementProps {
  element: CanvasElement;
}

const LabelElement: React.FC<LabelElementProps> = ({ element }) => {
  const { content, properties } = element;
  const fontSize = properties.fontSize || 18;
  const fontColor = properties.fontColor || "#000000";
  const backgroundColor = properties.backgroundColor || "transparent";
  const textAlign = properties.textAlign || "center";
  const borderColor = properties.borderColor || "#e8e8e8";
  const borderWidth = properties.borderWidth || 0;
  const borderStyle = properties.borderStyle || "solid";

  return (
    <div
      className="label-element"
      style={{
        fontSize: `${fontSize}px`,
        fontWeight: "bold",
        color: fontColor,
        backgroundColor,
        textAlign,
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent:
          textAlign === "center"
            ? "center"
            : textAlign === "right"
            ? "flex-end"
            : "flex-start",
        overflow: "hidden",
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

export default LabelElement;
