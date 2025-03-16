export type ComponentType =
  | "label"
  | "text"
  | "image"
  | "indicator"
  | "table"
  | "echarts";

export interface ComponentData {
  id: string;
  type: ComponentType;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
  title?: string;
  visible: boolean;
  data?: Record<string, any>;
}
