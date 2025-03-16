import type { ComponentData } from "../lib/types";
import LabelComponent from "./widgets/label-component";
import TextComponent from "./widgets/text-component";
import ImageComponent from "./widgets/image-component";
import IndicatorComponent from "./widgets/indicator-component";
import TableComponent from "./widgets/table-component";
import EChartsComponent from "./widgets/echarts-component";

interface ComponentRendererProps {
  component: ComponentData;
}

export default function ComponentRenderer({
  component,
}: ComponentRendererProps) {
  switch (component.type) {
    case "label":
      return <LabelComponent component={component} />;
    case "text":
      return <TextComponent component={component} />;
    case "image":
      return <ImageComponent component={component} />;
    case "indicator":
      return <IndicatorComponent component={component} />;
    case "table":
      return <TableComponent component={component} />;
    case "echarts":
      return <EChartsComponent component={component} />;
    default:
      return <div>未知组件类型</div>;
  }
}
