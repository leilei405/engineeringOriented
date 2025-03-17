import type React from "react";
import type { CanvasElement } from "../../types";
import { Image } from "antd";

interface ImageElementProps {
  element: CanvasElement;
}

const ImageElement: React.FC<ImageElementProps> = ({ element }) => {
  const { properties } = element;
  const imageUrl =
    properties.imageUrl ||
    "https://lowcodedemo.top/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20241104203230.jpg";
  const objectFit = properties.objectFit || "contain";
  const backgroundColor = properties.backgroundColor || "#ffffff";
  const borderColor = properties.borderColor || "#e8e8e8";
  const borderWidth = properties.borderWidth || 1;
  const borderStyle = properties.borderStyle || "solid";

  return (
    <div
      className="image-element"
      style={{
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        backgroundColor,
        border:
          borderWidth > 0
            ? `${borderWidth}px ${borderStyle} ${borderColor}`
            : "none",
      }}
    >
      <Image
        src={imageUrl || "/placeholder.svg"}
        alt="图片"
        style={{
          width: "100%",
          height: "100%",
          objectFit: objectFit as "contain" | "cover" | "fill",
        }}
        preview={false}
      />
    </div>
  );
};

export default ImageElement;
