import type { ComponentData } from "../../lib/types";
import styles from "../../styles/widgets/indicator-component.module.scss";

interface IndicatorComponentProps {
  component: ComponentData;
}

export default function IndicatorComponent({
  component,
}: IndicatorComponentProps) {
  const value = component.data?.value || "5G逻辑基站数";
  const description = component.data?.description || "基站数";
  const trend = component.data?.trend || "up";
  const color = component.data?.color || "blue";

  return (
    <div className={styles.indicatorComponent}>
      <div className={styles.value} style={{ color: getColor(color) }}>
        {value}
      </div>
      <div className={styles.description}>
        <span>{description}</span>
        {trend === "up" && <span className={styles.trendUp}>↑ 5.2%</span>}
        {trend === "down" && <span className={styles.trendDown}>↓ 3.1%</span>}
      </div>
    </div>
  );
}

function getColor(color: string): string {
  switch (color) {
    case "blue":
      return "#1677ff";
    case "green":
      return "#52c41a";
    case "red":
      return "#f5222d";
    case "orange":
      return "#fa8c16";
    default:
      return "#1677ff";
  }
}
