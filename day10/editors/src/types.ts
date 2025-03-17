export type ElementType = "label" | "text" | "image" | "indicator" | "table" | "chart"

export interface Position {
  x: number
  y: number
}

export interface Size {
  width: number
  height: number
}

export interface CanvasElement {
  id: string
  type: ElementType
  position: Position
  size: Size
  content: string
  visible: boolean
  zIndex: number
  properties: Record<string, any>
}

export interface ChartOption {
  id: string
  businessType: string
  periodType: string
  chartType: string
  name: string
  description: string
  creator: string
  createTime: string
  status: string
}

export interface TableOption {
  id: string
  businessType: string
  periodType: string
  name: string
  description: string
  creator: string
  createTime: string
  status: string
}

export interface IndicatorOption {
  id: string
  businessType: string
  dataSource: string
  periodType: string
  name: string
  description: string
  department: string
  sourceSystem: string
  unit: string
  status: string
}

