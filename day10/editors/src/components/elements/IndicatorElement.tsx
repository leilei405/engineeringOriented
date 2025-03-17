import type React from "react";
import type { CanvasElement } from "../../types";

interface IndicatorElementProps {
  element: CanvasElement;
}

const IndicatorElement: React.FC<IndicatorElementProps> = ({ element }) => {
  const { properties } = element;
  const {
    prefix = "",
    suffix = "",
    fontSize = 24,
    fontColor = "#1890ff",
    titleFontSize = 16,
    titleFontColor = "#000000",
    backgroundColor = "#ffffff",
    borderColor = "#e8e8e8",
    borderWidth = 1,
    borderStyle = "solid",
    indicatorName = "指标名称",
    value = "2,323,499.981",
  } = properties;

  return (
    <div
      className="indicator-element"
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor,
        border:
          borderWidth > 0
            ? `${borderWidth}px ${borderStyle} ${borderColor}`
            : "none",
        pointerEvents: "none", // 防止干扰拖拽
      }}
    >
      <div
        style={{
          fontSize: `${titleFontSize}px`,
          marginBottom: "8px",
          color: titleFontColor,
        }}
      >
        {indicatorName}
      </div>
      <div
        style={{
          fontSize: `${fontSize}px`,
          fontWeight: "bold",
          color: fontColor,
        }}
      >
        {prefix}
        {value}
        {suffix}
      </div>
    </div>
  );
};

export default IndicatorElement;
